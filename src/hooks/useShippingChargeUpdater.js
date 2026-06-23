import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setShippingCharge } from "@/store/slices/checkoutSlice";
import { useGetShippingChargeMutation } from "@/store/services/orderApi";

export function useShippingChargeUpdater() {
  const dispatch = useDispatch();
  const [getShippingCharge] = useGetShippingChargeMutation();

  /** Calls API and dispatches result to Redux → updates OrderSummary. Returns the charge value. */
  const updateCharge = useCallback(
    async (stateId, type) => {
      if (!stateId) return null;
      try {
        const result = await getShippingCharge({ state_id: stateId, type }).unwrap();
        const charge = result?.data?.overall_delivery_charge;
        if (charge !== undefined) dispatch(setShippingCharge(charge));
        return charge ?? null;
      } catch (err) {
        console.error("Failed to update shipping charge:", err);
        return null;
      }
    },
    [dispatch, getShippingCharge],
  );

  /** Calls API and returns the charge value WITHOUT dispatching (for in-form preview). */
  const calculateCharge = useCallback(
    async (stateId, type) => {
      if (!stateId) return null;
      try {
        const result = await getShippingCharge({ state_id: stateId, type }).unwrap();
        return result?.data?.overall_delivery_charge ?? null;
      } catch (err) {
        console.error("Failed to calculate shipping charge preview:", err);
        return null;
      }
    },
    [getShippingCharge],
  );

  return { updateCharge, calculateCharge };
}
