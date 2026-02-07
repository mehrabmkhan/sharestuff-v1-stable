
/**
 * ShareStuff Dynamic Pricing Engine v1.3
 * Calculates shipment costs based on logistics variables, risk assessment, and urgency.
 */

export interface PricingResult {
  baseFee: number;
  valueSurcharge: number;
  urgencyPremium: number;
  insurancePremium: number;
  total: number;
  platformCommission: number; // 20% platform take
  travelerPayout: number;     // 80% traveler take
}

/**
 * Calculates the total cost of a shipment.
 * 
 * @param weightKg - Weight of the item in kilograms
 * @param ratePerKg - The price per KG (asking or negotiated)
 * @param declaredValue - Total value of the item in USD
 * @param urgency - The speed of delivery requested
 * @param insuranceType - Protection tier for the shipment
 */
export const calculateTotal = (
  weightKg: number, 
  ratePerKg: number,
  declaredValue: number, 
  urgency: 'flexible' | 'express' | 'next-flight', 
  insuranceType: 'BASIC' | 'PRO' | 'PREMIUM'
): PricingResult => {
  // Ensure we don't process negative values
  const weight = Math.max(0, weightKg);
  const value = Math.max(0, declaredValue);
  const rate = Math.max(0, ratePerKg);

  // 1. Base fee derived from the traveler's specific rate (asking or bid)
  const baseFee = weight * rate;

  // 2. Security Surcharge for high-value items (Risk management)
  // We apply a 2% risk premium on any value exceeding $500
  const valueSurcharge = value > 500 ? (value - 500) * 0.02 : 0;

  // 3. Urgency Multipliers (Applied to base fee only)
  const urgencyMultipliers = {
    'flexible': 1.0,
    'express': 1.25,
    'next-flight': 1.5
  };
  const urgencyPremium = baseFee * (urgencyMultipliers[urgency] - 1);

  // 4. Insurance Tiers
  let insurancePremium = 0;
  switch (insuranceType) {
    case 'PRO':
      insurancePremium = 15.00; // Flat fee for Pro coverage
      break;
    case 'PREMIUM':
      insurancePremium = value * 0.05; // 5% of value for Premium coverage
      break;
    case 'BASIC':
    default:
      insurancePremium = 0; // Included in platform fees
      break;
  }

  // Final Total Calculation
  const totalRaw = baseFee + valueSurcharge + urgencyPremium + insurancePremium;
  
  // Platform Split (Standard 20/80 model)
  const platformCommissionRaw = totalRaw * 0.20;
  const travelerPayoutRaw = totalRaw - platformCommissionRaw;

  return {
    baseFee: Number(baseFee.toFixed(2)),
    valueSurcharge: Number(valueSurcharge.toFixed(2)),
    urgencyPremium: Number(urgencyPremium.toFixed(2)),
    insurancePremium: Number(insurancePremium.toFixed(2)),
    total: Number(totalRaw.toFixed(2)),
    platformCommission: Number(platformCommissionRaw.toFixed(2)),
    travelerPayout: Number(travelerPayoutRaw.toFixed(2))
  };
};
