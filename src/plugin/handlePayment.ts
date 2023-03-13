import { trialPeriod } from "../dataConfig";

export const handlePayment = async () => {
  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  const secondsSinceFirstRun = figma.payments.getUserFirstRanSecondsAgo();
  const daysSinceFirstRun = secondsSinceFirstRun / ONE_DAY_IN_SECONDS;

  // figma.payments.setPaymentStatusInDevelopment({
  //   type: "UNPAID",
  // });

  if (figma.payments.status.type === "UNPAID") {
    // console.log("daysSinceFirstRun", daysSinceFirstRun);

    if (daysSinceFirstRun > trialPeriod) {
      await figma.payments.initiateCheckoutAsync({
        interstitial: "TRIAL_ENDED",
      });

      if (figma.payments.status.type === "UNPAID") {
        figma.notify(
          "Your free trial has expired, please upgrade to continue."
        );
        figma.closePlugin();
        return;
      }
    }

    return Math.round(trialPeriod - daysSinceFirstRun);
  }
};
