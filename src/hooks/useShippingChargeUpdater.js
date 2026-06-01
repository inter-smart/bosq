import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setShippingCharge } from "@/store/slices/checkoutSlice";
import { useGetShippingChargeMutation } from "@/store/services/orderApi";

/**
 * Returns an `updateCharge(stateId)` function.
 * Call it whenever the effective shipping state changes.
 * It will POST to the backend and store the result in Redux,
 * which OrderSummary reads reactively.
 */
export function useShippingChargeUpdater() {
  const dispatch = useDispatch();
  const [getShippingCharge] = useGetShippingChargeMutation();

  const updateCharge = useCallback(
    async (stateId) => {
      if (!stateId) return;
      try {
        const result = await getShippingCharge({ state_id: stateId }).unwrap();
        const charge = result?.data?.overall_delivery_charge;
        if (charge !== undefined) {
          dispatch(setShippingCharge(charge));
        }
      } catch (err) {
        console.error("Failed to update shipping charge:", err);
      }
    },
    [dispatch, getShippingCharge],
  );

  return { updateCharge };
}
