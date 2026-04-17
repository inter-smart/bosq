"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, LogIn, X } from "lucide-react"; // You may need to install lucide-react

export default function LoginRequiredModal({ isOpen, onClose, locale }) {
    const router = useRouter();

    const handleLogin = () => {
        onClose();
        router.push(`/${locale}/login`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[440px] p-0 gap-0 overflow-hidden">
                {/* Header with gradient background */}
                <div className="relative dark:from-black dark:via-black dark:to-black px-6 pt-8 pb-6">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>

                    <DialogHeader className="space-y-3 text-center">
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            Login Required
                        </DialogTitle>
                        <DialogDescription className="text-base text-gray-600 dark:text-gray-300">
                            Please login to save items to your wishlist and access personalized features.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Footer with actions */}
                <DialogFooter className="px-6 py-6 bbg-gray-50 dark:bg-gray-900/50 flex-col sm:flex-row gap-3 sm:gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full sm:w-auto order-2 sm:order-1"
                    >
                        Maybe Later
                    </Button>
                    <Button
                        onClick={handleLogin}
                        className="w-full sm:w-auto bg-black hover:bg-gray-600 text-white order-1 sm:order-2 gap-2"
                    >
                        <LogIn className="h-4 w-4" />
                        Login Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}