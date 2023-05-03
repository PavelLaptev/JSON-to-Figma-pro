import { trialPeriod } from "../dataConfig";

export const handlePayment = async (msg) => {
  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  const secondsSinceFirstRun = figma.payments.getUserFirstRanSecondsAgo();
  const daysSinceFirstRun = secondsSinceFirstRun / ONE_DAY_IN_SECONDS;

  // console.log("secondsSinceFirstRun", trialPeriod - daysSinceFirstRun);

  figma.payments.setPaymentStatusInDevelopment({
    type: "PAID",
  });

  if (msg.type === "get-trial" && figma.payments.status.type === "UNPAID") {
    // console.log("daysSinceFirstRun", daysSinceFirstRun, trialPeriod);

    if (daysSinceFirstRun > trialPeriod) {
      await figma.payments.initiateCheckoutAsync({
        interstitial: "TRIAL_ENDED",
      });

      figma.notify("Your free trial has expired, please upgrade to continue.");
      figma.closePlugin();
    }

    const daysLeft = Math.round(trialPeriod - daysSinceFirstRun);
    // console.log("daysLeft", daysLeft);

    return daysLeft;
  }
};
