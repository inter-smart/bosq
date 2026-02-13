"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  locale,
  variant = "default",
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0,
      );
      animate(maxX);
    }
  };
  const handleNewsletterSubmit = async (email) => {
    if (isSubmitting) return;

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    const API_URL = `/api/frontend/enquiries/news-letter`;
    try {
      const recaptchaToken = await executeRecaptcha("contact_enquiry_form");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          recaptcha_token: recaptchaToken,
        }),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");

      const data = await res.json();

      console.log("data:", data);

      toast.success(data?.message);
    } catch (error) {
      console.log("Newsletter subscription error:", error);
      toast.error(
        error.message || "An error occurred. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ Success UX only after API success
    vanishAndSubmit();
    onSubmit?.(e);

    const emailInput = e.target.querySelector('input[type="text"]');
    const email = emailInput?.value?.trim();
    handleNewsletterSubmit(email);
  };

  return (
    <form
      className={cn(
        "w-full relative max-w-full mx-auto bg-none border-b border-white dark:bg-zinc-800 h-7 2xl:h-8 overflow-hidden transition duration-200",
        value && "bg-none",
        variant === "search" &&
          "h-9 2xl:h-10 3xl:h-13 bg-white border border-[#e9e9e9]",
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-0 origin-top-left filter",
          !animating ? "opacity-0" : "opacity-100",
          locale === "ar" ? "right-0 pl-20" : "left-0 pr-20",
          variant === "search" && "px-0",
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] leading-tight font-light text-white w-full relative z-50 border-none dark:text-white bg-transparent h-full focus:outline-none focus:ring-0 selection:bg-white selection:text-black ",
          animating && "text-transparent dark:text-transparent",
          locale === "ar" ? "pr-0 pl-20" : "pl-0 pr-20",
          variant === "search" && "text-black selection:bg-gray-500",
          variant === "search" && (locale === "ar" ? "pr-3" : "pl-3"),
        )}
      />
      <button
        disabled={!value}
        type="submit"
        aria-label="submit"
        className={cn(
          "w-3.5 absolute top-1/2 z-50 -translate-y-1/2 rounded-full transition duration-200 flex items-center justify-center",
          locale === "ar" ? "left-0 rotate-180" : "right-0 rotate-0",
          variant === "search" && (locale === "ar" ? "ml-3" : "mr-3"),
        )}
      >
        {variant === "search" ? (
          <Search
            className={cn(
              "size-3",
              value ? "text-black" : "text-[#282828]",
              locale === "ar" && "rotate-180",
            )}
          />
        ) : (
          <motion.svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.22363 0.749023L16.2614 6.96595L9.22363 13.4131"
              stroke={value ? "#f17423" : "#999"}
              strokeWidth="2"
            />
            <path
              d="M0 7.02539H16.1188"
              stroke={value ? "#f17423" : "#999"}
              strokeWidth="2"
            />
          </motion.svg>
        )}
      </button>
      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className={cn(
                "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] leading-tight font-light text-white/50 dark:text-zinc-500 pl-0 text-start w-[calc(100%-2rem)] truncate",
                variant === "search" && "text-black/50 px-3",
              )}
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
