import { isValidPhoneNumber } from "libphonenumber-js";
import z from "zod";


let t = null;

export const setValidationTranslator = (translator) => {
  t = translator;
};


const vt = (key, values) => {
  if (!t) return key; // fallback to key if not set
  return t(key, values);
};




export const commonValidations = {
  name: (Value) =>
    z
      .string()
      .trim()
      .min(2, vt("min_length", { field: Value, min: 2 }))
      .max(100, vt("max_length", { field: Value, max: 100 }))

      .refine(
        (val) => !/[\t\n\r]/.test(val),
        vt("invalid_whitespace", { field: Value }),
      )

      .refine(
        (val) => /^[\p{L}][\p{L}\s'-]*$/u.test(val),
        vt("invalid_characters", { field: Value }),
      )

      .refine(
        (val) => !/\d/.test(val),
        vt("no_numbers", { field: Value }),
      )

      .refine(
        (val) =>
          !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=)/i.test(
            val,
          ),
        vt("invalid_content", { field: Value }),
      )

      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        vt("invalid_content", { field: Value }),
      ),

  email: () =>
    z
      .string()
      .trim()
      .min(1, vt("required", { field: "Email" }))
      .max(255, vt("max_length", { field: "Email", max: 255 }))
      .email(vt("invalid_email"))
      .refine((val) => !/\s/.test(val), vt("no_spaces"))
      .refine((val) => !/[<>]/.test(val), vt("invalid_characters"))
      .refine(
        (val) =>
          !/(script|<script>|<\/script>|alert\(|onerror=|onload=)/i.test(val),
        vt("invalid_content", { field: "Email" }),
      ),

  password: () =>
    z
      .string()
      .min(8, vt("password_min"))
      .max(100, vt("password_max"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        vt("password_strength"),
      ),

  otp: ()=> z
    .string()
    .length(4, vt("otp_length"))
    .regex(/^\d+$/, vt("otp_numeric")),

  rememberMe: z.boolean().default(false),

  phone: ()=> z
    .string()
    .trim()
    .min(1, vt("required", { field: "Phone" }))

    .refine((val) => isValidPhoneNumber(val), {
      message: vt("invalid_phone"),
    })

    .refine((val) => /^[0-9+\s()-]+$/.test(val), {
      message: vt("invalid_characters"),
    })

    .transform((val) => val.replace(/[\s()-]/g, ""))

    .refine((val) => /^\+?[0-9]+$/.test(val), {
      message: vt("invalid_phone_format"),
    })

    .refine(
      (val) => {
        const digits = val.replace("+", "");
        return digits.length >= 8 && digits.length <= 15;
      },
      { message: vt("invalid_phone_length") },
    )

    .refine((val) => !/^(\+)?0+$/.test(val), {
      message: vt("phone_all_zeros"),
    }),

  requiredString: (val) =>
    z.string().min(1, vt("required", { field: val })),

  optionalBoolean: () => z.boolean().optional(),
  optionalString: () => z.string().optional(),

  text: (val) =>
    z.string().trim().min(1, vt("required", { field: val })),

  region: () => z.string().min(1, vt("select_region")),
};
