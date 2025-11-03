# proiect-inginerie-software
# Product Vision

**FOR**  Sports betting enthusiasts and online casino players who seek a secure, fast, and entertaining platform.  

**WHO**  Want to place live sports bets, play slot and casino games, and manage their funds confidently in one unified web application.  

**THE PRODUCT – FinalStake**  Is a **web-based sports betting and casino platform** .

**THAT**  Offers users a seamless and enjoyable betting experience — combining real-time odds, casino gameplay, wallet management, and personalized rewards.  

**UNLIKE**  Traditional betting platforms that are slow, complex, or lack transparent security mechanisms.  

**OUR PRODUCT**  Delivers a modern, reliable, and responsive experience powered by scalable architecture, fast transactions, and an intuitive interface available on any device.

---

# User Personas & Scenarios
###  1. Adrian Ionescu – Regular User
**Age:** 27  
**Occupation:** Customer Service Representative  
**Location:** Bucharest, Romania  
**Background:**  
Alex works full-time in a customer service role and enjoys watching football and basketball matches. He often places small bets during live games and occasionally plays online slots for fun. He values fast access, clear odds, and simple navigation when using betting platforms.  
**Goals and Motivation:**  
- Place live bets easily from mobile or desktop.  
- Deposit and withdraw money quickly using Stripe.  
- Enjoy a secure and fair gaming experience. 

**Frustrations:**  
- Complicated login systems.  
- Delays in withdrawals or payment verification.  
- Cluttered and non-responsive betting sites.
    
**Interest in FinalStake:**  
Alex appreciates FinalStake’s fast, easy to use interface, secure login, and instant Stripe transactions, which allow him to focus on entertainment without worrying about security or delays.


###  Scenario – Regular User (Adrian Ionescu)

**Goal:**  
Place a live sports bet, play a casino game, and manage wallet transactions securely.  

**Precondition:**  
Adrian is logged in through **Auth0** and has funds in his **FinalStake** wallet.  

**Main Flow:**  
1. Adrian logs in using Google (Auth0 authentication).  
2. He selects a football match and places a €10 bet via **Stripe**.  
3. The backend validates odds and records the transaction.  
4. Afterward, Adrian plays a slot game using €2 per spin; winnings are updated in real time.  
5. He checks his wallet history and withdraws €20 to his bank account.  

**Postcondition:**  
All operations are confirmed instantly — his wallet updates automatically, and all data is securely stored through **Spring Boot** and **Stripe** integration.  

**Quality Attributes:**  
Secure authentication (Auth0), reliable payments (Stripe), responsive UI (Angular), and scalable backend (Spring Boot).

---

###  2. Andreea Popescu – Accounting Officer
**Age:** 33  
**Occupation:** Financial Accountant  
**Location:** Cluj-Napoca, Romania  
**Background:**  
Andreea works in the accounting department for FinalStake, managing all transactions, bonuses, and payment reconciliations. She has a bachelor’s degree in finance and is highly experienced in digital bookkeeping and payment auditing.  

**Goals and Motivation:**  
- Monitor daily deposits and withdrawals efficiently.  
- Ensure compliance with financial regulations.  
- Generate reports for management and identify anomalies or fraud attempts.  

**Frustrations:**  
- Manual data entry and unstructured transaction logs.  
- Lack of integration between betting data and payment processing.  

**Interest in FinalStake:**  
FinalStake’s administrative dashboard provides Andreea with structured reports, real-time Stripe transaction logs, and exportable data for accounting tools, making her workflow faster and more accurate.

### Scenario – Accounting Officer (Andreea Popescu)

**Goal:**  
Review and verify all daily financial transactions processed through FinalStake.  

**Precondition:**  
Andreea is logged in with accounting privileges and has access to the financial dashboard.  

**Main Flow:**  
1. Andreea logs into FinalStake’s admin panel using **Auth0**.  
2. She opens the **Accounting Dashboard** and filters **Stripe** transactions from the last 24 hours.  
3. The system displays deposits, withdrawals, and bet payouts linked to user IDs.  
4. She exports the transaction report in CSV format for record keeping and compliance.  

**Postcondition:**  
All transactions are verified, logged, and ready for management review.  
Reports are consistent with Stripe data, ensuring transparency and accuracy.  

**Quality Attributes:**  
Data consistency, traceability, role-based access control (Auth0), and reliable reporting through Stripe integration.


---

###  3. Daniel Ionescu – Administrator
**Age:** 40  
**Occupation:** Operations Manager  
**Location:** Timișoara, Romania  
**Background:**  
Daniel oversees the FinalStake platform’s operations. With a background in software management and business analytics, he’s responsible for maintaining system stability, compliance, and customer satisfaction.  

**Goals and Motivation:**  
- Monitor platform activity in real-time.  
- Manage user permissions and resolve escalated issues.  
- View system health metrics and ensure uptime.  

**Frustrations:**  
- Fragmented data between betting, users, and payments.  
- Lack of real-time monitoring tools.  

**Interest in FinalStake:**  
Daniel uses FinalStake’s management tools to access analytics dashboards, user activity reports, and system status updates, enabling him to make informed operational decisions and maintain a high-quality user experience.

### Scenario – Administrator / Manager (Daniel Ionescu)

**Goal:**  
Monitor the FinalStake platform’s performance, user activity, and overall system stability.  

**Precondition:**  
Daniel is logged in with administrative privileges via **Auth0**.  

**Main Flow:**  
1. Daniel accesses the **Admin Dashboard** from the FinalStake web app.  
2. He reviews live system metrics such as uptime, number of active users, and ongoing Stripe transactions.  
3. He checks user activity logs for suspicious behavior or failed payments.  
4. If an issue appears, he uses admin controls to disable accounts or restart services.  

**Postcondition:**  
The system operates within normal parameters, and Daniel confirms all services (Auth0, Stripe, Database, Spring Boot API) are running smoothly.  

**Quality Attributes:**  
System reliability, monitoring, maintainability, and administrative control through secure access.
