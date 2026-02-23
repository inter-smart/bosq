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
      .min(1, vt("email_required"))
      .email(vt("invalid_email"))
      .refine((val) => !/\s/.test(val), vt("no_spaces"))
      .refine((val) => !/[<>]/.test(val), vt("invalid_characters", { field: "Email" }))
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

  otp: () => z
    .string()
    .length(4, vt("otp_length"))
    .regex(/^\d+$/, vt("otp_numeric")),

  rememberMe: z.boolean().default(false),

  phone: () =>
    z
      .string()
      .trim()
      .min(1, vt("required", { field: vt("phone_number") }))

    .refine((val) => isValidPhoneNumber(val), {
      message: vt("invalid_phone"),
    })

    .refine((val) => /^[0-9+\s()-]+$/.test(val), {
      message: vt("invalid_characters", { field: "Phone" }),
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
    ),

        // if (/^0+$/.test(digits)) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: vt("phone_all_zeros"),
        //   });
        // }
      // }),
  requiredString: (val) =>
    z.string().min(1, vt("required", { field: val })),

  optionalBoolean: () => z.boolean().optional(),
  optionalString: () => z.string().optional(),

  text: (val) =>
    z.string().trim().min(1, vt("required", { field: val })),

  region: () => z.string().min(1, vt("select_region")),

  message: (field) =>
    z
      .string()
      .trim()
      .max(1000, vt("max_length", { field, max: 1000 }))
      .superRefine((val, ctx) => {
        // ✅ Allow empty (optional field)
        if (!val) return;

        // 1. Min length only if user typed something
        if (val.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: vt("min_length", { field, min: 2 }),
          });
          return;
        }

        // 2. Reject tabs & newlines
        if (/[\t\n\r]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: vt("invalid_whitespace", { field }),
          });
        }

        // 3. Must contain at least one letter or number
        if (!/[\p{L}\p{N}]/u.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: vt("invalid_characters", { field }),
          });
        }

        // 4. XSS patterns
        if (/(<script|<\/script>|javascript:|onerror=|onload=|alert\s*\()/i.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: vt("invalid_content", { field }),
          });
        }

        // 5. iframe / template injection
        if (/(<iframe|<\/iframe>|\{\{|\}\}|\$\{)/i.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: vt("invalid_content", { field }),
          });
        }

        // 6. SQL injection patterns
        if (/(\bDROP\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b|--|;)/i.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: vt("invalid_content", { field }),
          });
        }
      }),

  image: ({
    required = false,
    maxSizeMB = 5,
  } = {}) =>
    z
      .any()
      .refine(
        (file) => {
          // optional field
          if (!required && (!file || file.length === 0)) return true;
          return file instanceof File || file?.[0] instanceof File;
        },
        { message: vt("file_required") }
      )
      .refine(
        (file) => {
          if (!file || file.length === 0) return true;
          const f = file instanceof File ? file : file[0];
          return f.type.startsWith("image/");
        },
        { message: vt("only_image_allowed") }
      )
      .refine(
        (file) => {
          if (!file || file.length === 0) return true;
          const f = file instanceof File ? file : file[0];

          // ❌ Explicitly block PDF
          if (f.type === "application/pdf") return false;

          return true;
        },
        { message: vt("pdf_not_allowed") }
      )
      .refine(
        (file) => {
          if (!file || file.length === 0) return true;
          const f = file instanceof File ? file : file[0];
          return f.size <= maxSizeMB * 1024 * 1024;
        },
        { message: vt("file_size_exceeded", { size: maxSizeMB }) }
      ),
};
