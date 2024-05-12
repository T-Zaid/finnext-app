import BalanceBox from "@/components/BalanceBox";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import React from "react";

export default function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user="Tiger"
            subtext="Access & Manage your acount and transactions efficiently" />
          <BalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.23} />
        </header>
      </div>
      <RightSidebar user={{firstName: "Tiger", lastName: "Mastery", email: 'tiger@mastery.pro'}} />
    </section>
  );
}
