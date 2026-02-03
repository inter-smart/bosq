import z from "zod";

export const commonValidations = {
  name: (Value) =>
    z
      .string()
      .trim()
      .min(2, `${Value} must be at least 2 characters`)
      .max(100, `${Value} must be under 100 characters`)
      // Reject tabs & newlines
      .refine(
        (val) => !/[\t\n\r]/.test(val),
        `${Value} contains invalid whitespace`,
      )
      // Allow letters (unicode), spaces, apostrophe & hyphen
      .refine(
        (val) => /^[\p{L}][\p{L}\s'-]*$/u.test(val),
        `${Value} contains invalid characters`,
      )
      // Reject numbers
      .refine((val) => !/\d/.test(val), `${Value} must not contain numbers`)
      // Block script / JS / SQL injections
      .refine(
        (val) =>
          !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=)/i.test(
            val,
          ),
        `Invalid ${Value} content`,
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        `Invalid ${Value} content`,
      ),

  email: () =>
    z
      .string()
      .trim()
      .min(1, "Email is required")
      .max(255, "Email must be under 256 characters")
      .email("Invalid email format")
      .refine((val) => !/\s/.test(val), "Email must not contain spaces")
      .refine((val) => !/[<>]/.test(val), "Invalid characters in email")
      .refine(
        (val) =>
          !/(script|<script>|<\/script>|alert\(|onerror=|onload=)/i.test(val),
        "Invalid email content",
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        "Invalid email content",
      ),

  password: () =>
    z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),

  otp: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),

  rememberMe: z.boolean().default(false),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")

    // Allow only digits, spaces, +, -, ()
    .refine((val) => /^[0-9+\s()-]+$/.test(val), {
      message: "Phone number contains invalid characters",
    })

    // Normalize → remove spaces, -, ()
    .transform((val) => val.replace(/[\s()-]/g, ""))

    // Allow optional leading +
    .refine((val) => /^\+?[0-9]+$/.test(val), {
      message: "Invalid phone number format",
    })

    // Length check (E.164: max 15 digits, min 8 is practical)
    .refine(
      (val) => {
        const digits = val.replace("+", "");
        return digits.length >= 8 && digits.length <= 15;
      },
      {
        message: "Phone number length is invalid",
      },
    )

    // Reject all zeros
    .refine((val) => !/^(\+)?0+$/.test(val), {
      message: "Phone number cannot be all zeros",
    }),

  requiredString: (val) => z.string().min(1, `${val} is required`),

  optionalBoolean: () => z.boolean().optional(),

  optionalString: () => z.string().optional(),
};
