HOW TO TAKE THIS LIVE — STEP BY STEP
======================================

This covers: setting up Supabase (database + login system), Razorpay
(payments), testing locally, and deploying both the app and the landing
page to Vercel.

You'll need Node.js installed (same idea as installing Python earlier --
go to nodejs.org, download the LTS version, install it, restart your
terminal, then check it worked with: node --version)


PART 1 — SUPABASE (the database + login system)
--------------------------------------------------
1. Go to supabase.com, sign up, click "New Project"
2. Give it a name (e.g. "probroker"), set a database password (save it
   somewhere), pick a region close to India, click Create
3. Wait ~2 minutes for it to finish setting up
4. Go to the SQL Editor (left sidebar) -> New Query
5. Open supabase.sql (in this folder), copy the whole thing, paste it in,
   click Run -- this creates your "reports" table
6. Go to Project Settings -> API. You'll need three values from this page:
     - Project URL
     - anon public key
     - service_role key (click "Reveal" to see it)
7. (Optional but recommended while testing) Go to Authentication ->
   Providers -> Email, and turn OFF "Confirm email" temporarily so you can
   test signup/login instantly without checking an inbox. Turn it back ON
   before real customers use this.


PART 2 — RAZORPAY (payments)
--------------------------------
1. Go to razorpay.com, sign up for a business account
2. You'll land in TEST mode by default -- perfect, don't switch to live
   mode until you're ready to take real payments
3. Go to Settings -> API Keys -> Generate Test Key
4. Copy the Key ID and Key Secret


PART 3 — SET UP THE PROJECT ON YOUR COMPUTER
------------------------------------------------
1. Put this whole probroker-app folder somewhere easy to find
2. Open a terminal, navigate into it:
     cd path/to/probroker-app
3. Install everything it needs:
     npm install
4. Copy the environment template and fill it in:
     cp .env.local.example .env.local
   Then open .env.local in a text editor and paste in:
     - NEXT_PUBLIC_SUPABASE_URL          (from Supabase Part 1, step 6)
     - NEXT_PUBLIC_SUPABASE_ANON_KEY     (from Supabase Part 1, step 6)
     - SUPABASE_SERVICE_ROLE_KEY         (from Supabase Part 1, step 6)
     - RAZORPAY_KEY_ID                   (from Razorpay Part 2, step 4)
     - RAZORPAY_KEY_SECRET               (from Razorpay Part 2, step 4)
     - NEXT_PUBLIC_RAZORPAY_KEY_ID       (same value as RAZORPAY_KEY_ID)
5. Test it locally:
     npm run dev
   Open http://localhost:3000 in your browser -- it should redirect to a
   login page. Click "Sign up", create a test account, log in, and you
   should land on a dashboard with a "Pay ₹299" button. Razorpay's test
   mode lets you "pay" with fake card 4111 1111 1111 1111, any future
   expiry date, any CVV -- it won't charge anything real.


PART 4 — DEPLOY THE APP TO VERCEL
--------------------------------------
1. Push this probroker-app folder to a new GitHub repository (same way
   your TRIGGR project lives on GitHub)
2. Go to vercel.com, sign in with GitHub, click "Add New -> Project"
3. Import the probroker-app repo
4. Before clicking Deploy, go to "Environment Variables" and add all six
   values from your .env.local file, one by one
5. Click Deploy
6. Once it's live, Vercel gives you a URL like probroker-app.vercel.app --
   that's your real, live signup/login/dashboard system


PART 5 — DEPLOY THE LANDING PAGE
--------------------------------------
1. The landing page (the HTML file) is completely separate -- it needs no
   build step at all
2. Go to vercel.com -> Add New -> Project -> and this time just drag the
   HTML file's folder in directly (or push it to its own tiny GitHub repo
   and import that instead, same process as above)
3. Vercel will detect it's a static site and deploy it instantly
4. Open the landing page file and find every button that says things like
   "Get Your Free Report" or "Message Us on WhatsApp" -- for the ones
   meant to create an account, point them to your app's URL instead, e.g.:
     <a href="https://probroker-app.vercel.app/signup">


PART 6 — CUSTOM DOMAIN (once you're ready)
------------------------------------------------
Both Vercel projects can have a custom domain attached for free under
Project Settings -> Domains -- e.g. probroker.ai for the landing page and
app.probroker.ai for the login/dashboard. This is optional for launch; the
free .vercel.app URLs work perfectly well while you're validating.


WHAT'S STILL MANUAL RIGHT NOW, ON PURPOSE
--------------------------------------------
Paying ₹299 creates a "pending" row in the reports table -- it does NOT
yet automatically run the extraction pipeline. That connection (payment
confirmed -> pipeline runs -> report_url gets filled in -> customer sees
their download link) is the next piece to build, once you've confirmed
signup, login, and payment all work end to end. Until then: check the
Supabase "reports" table manually (Table Editor -> reports) after each
payment, run the pipeline by hand like we've been doing, and update that
row's report_url and status yourself via the Supabase table editor.
