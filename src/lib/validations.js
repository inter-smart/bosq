import z from "zod";

export const commonValidations = {
  name: () =>
    z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be under 100 characters")
      // Reject tabs & newlines
      .refine(
        (val) => !/[\t\n\r]/.test(val),
        "Name contains invalid whitespace",
      )
      // Allow letters (unicode), spaces, apostrophe & hyphen
      .refine(
        (val) => /^[\p{L}][\p{L}\s'-]*$/u.test(val),
        "Name contains invalid characters",
      )
      // Reject numbers
      .refine((val) => !/\d/.test(val), "Name must not contain numbers")
      // Block script / JS / SQL injections
      .refine(
        (val) =>
          !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=)/i.test(
            val,
          ),
        "Invalid name content",
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        "Invalid name content",
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
};
