import z from "zod";

export const createCommonValidations = (t) => ({
  name: () =>
    z
      .string()
      .trim()
      .min(2, t("name.min", {  min: 2 }))
      .max(100, t("name.max", { max: 100 }))
      .refine(
        (val) => !/[\t\n\r]/.test(val),
        t("name.invalid_whitespace"),
      )
      .refine(
        (val) => /^[\p{L}][\p{L}\s'-]*$/u.test(val),
        t("name.invalid_characters"),
      )
      .refine(
        (val) => !/\d/.test(val),
        t("name.no_numbers"),
      )
      .refine(
        (val) =>
          !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=|<img|<iframe)/i.test(val),
        t("name.invalid_content"),
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        t("name.invalid_content"),
      ),

  email: () =>
    z
      .string()
      .trim()
      .min(1, t("email.required"))
      .max(255, t("email.max", { max: 255 }))
      .email(t("email.invalid_format"))
      .refine(
        (val) => !/\s/.test(val),
        t("email.no_spaces"),
      )
      .refine(
        (val) => !/[<>]/.test(val),
        t("email.invalid_characters"),
      )
      .refine(
        (val) =>
          !/(script|<script>|<\/script>|alert\(|onerror=|onload=)/i.test(val),
        t("email.invalid_content"),
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        t("email.invalid_content"),
      ),

  password: () =>
    z
      .string()
      .min(8, t("password.min", { min: 8 }))
      .max(100, t("password.max", { max: 100 }))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        t("password.weak"),
      ),

  otp: z
    .string()
    .length(4, t("otp.length", { length: 4 }))
    .regex(/^\d+$/, t("otp.digits_only")),

  rememberMe: z.boolean().default(false),

  phone: z
    .string()
    .trim()
    .min(1, t("phone.required"))
    .refine(
      (val) => /^[0-9+\s()-]+$/.test(val),
      { message: t("phone.invalid_characters") },
    )
    .refine(
      (val) => /^(\+(?!\+))?[0-9\s()-]+$/.test(val),
      { message: t("phone.invalid_format") },
    )
    .transform((val) => val.replace(/[\s()-]/g, ""))
    .refine(
      (val) => /^\+?[0-9]+$/.test(val),
      { message: t("phone.invalid_format") },
    )
    .refine(
      (val) => {
        const digits = val.replace("+", "");
        return digits.length >= 8 && digits.length <= 15;
      },
      { message: t("phone.invalid_length", { min: 8, max: 15 }) },
    )
    .refine(
      (val) => !/^(\+)?0+$/.test(val),
      { message: t("phone.all_zeros") },
    )
    .refine(
      (val) =>
        !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=)/i.test(val),
      { message: t("phone.invalid_content") },
    )
    .refine(
      (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
      { message: t("phone.invalid_content") },
    ),

  message: () =>
    z
      .string()
      .trim()
      .min(2, t("message.min", { min: 2 }))
      .max(2000, t("message.max", { max: 2000 }))
      .refine(
        (val) => /[\p{L}\p{N}]/u.test(val),
        t("message.no_meaningful_content"),
      )
      .refine(
        (val) =>
          !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=|<img|<iframe)/i.test(val),
        t("message.invalid_content"),
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        t("message.invalid_content"),
      )
      .refine(
        (val) => !/\{\{.*?\}\}/s.test(val),
        t("message.invalid_content"),
      ),

  subject: () =>
    z
      .string()
      .trim()
      .min(2, t("subject.min", { min: 2 }))
      .max(200, t("subject.max", { max: 200 }))
      .refine(
        (val) => /[\p{L}\p{N}]/u.test(val),
        t("subject.no_meaningful_content"),
      )
      .refine(
        (val) =>
          !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=|<img|<iframe)/i.test(val),
        t("subject.invalid_content"),
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        t("subject.invalid_content"),
      )
      .refine(
        (val) => !/\{\{.*?\}\}/s.test(val),
        t("subject.invalid_content"),
      ),

  requiredString: (label) =>
    z.string().min(1, t("common.required", { label })),

  optionalBoolean: () => z.boolean().optional(),

  optionalString: () => z.string().optional(),

  text: (label) =>
    z.string().trim().min(1, t("common.required", { label })),

  region: () => z.string().min(1, t("region.required")),
});