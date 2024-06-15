import BalanceBox from "@/components/BalanceBox";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/server/user.action";
import React from "react";

export default async function Home() {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn.name || 'Guest'}
            subtext="Access & Manage your acount and transactions efficiently" />
          <BalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.23} />
        </header>
      </div>
      <RightSidebar
        user={loggedIn} 
        banks={[{}, {}]}/>
    </section>
  );
}
