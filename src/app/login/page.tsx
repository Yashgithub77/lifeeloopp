"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

type AuthState = "idle" | "authenticating" | "success" | "error";

function LoginContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [authState, setAuthState] = useState<AuthState>("idle");
    const [pulseRings, setPulseRings] = useState(0);

    // Pulse animation counter
    useEffect(() => {
        if (authState === "authenticating") {
            const interval = setInterval(() => {
                setPulseRings((prev) => (prev + 1) % 3);
            }, 600);
            return () => clearInterval(interval);
        }
    }, [authState]);

    const handleSignIn = async () => {
        setAuthState("authenticating");

        try {
            // Call NextAuth signIn
            const result = await signIn("google", {
                callbackUrl,
                redirect: false
            });

            if (result?.ok) {
                // Show success animation
                setAuthState("success");

                // Wait for animation then redirect
                setTimeout(() => {
                    router.push(callbackUrl);
                }, 2000);
            } else {
                setAuthState("error");
                setTimeout(() => setAuthState("idle"), 3000);
            }
        } catch (error) {
            setAuthState("error");
            setTimeout(() => setAuthState("idle"), 3000);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            }}
        >
            {/* Animated Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
                    style={{
                        background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
                        animation: "float 8s ease-in-out infinite"
                    }}
                />
                <div
                    className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
                    style={{
                        background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
                        animation: "float 10s ease-in-out infinite reverse"
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md mx-4">
                {authState === "idle" && (
                    <div
                        className="p-10 rounded-3xl shadow-2xl backdrop-blur-xl animate-slide-up"
                        style={{
                            background: "rgba(15, 23, 42, 0.8)",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        {/* Logo Animation */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-bounce-slow"
                                style={{
                                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
                                }}
                            >
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path
                                        d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20C32 13.4 26.6 8 20 8ZM20 10C25.5 10 30 14.5 30 20C30 25.5 25.5 30 20 30C14.5 30 10 25.5 10 20C10 14.5 14.5 10 20 10Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M15 18L18 21L25 14"
                                        stroke="white"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Welcome to LifeLoop
                            </h1>
                            <p className="text-slate-400 text-sm">
                                Your AI-powered life planning companion
                            </p>
                        </div>

                        {/* Sign In Button */}
                        <button
                            onClick={handleSignIn}
                            className="w-full group relative overflow-hidden"
                        >
                            <div
                                className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 group-hover:scale-[1.02] group-active:scale-[0.98]"
                                style={{
                                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                                }}
                            >
                                {/* Shine effect on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                        animation: "shine 1.5s infinite"
                                    }}
                                />

                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="white"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="white"
                                        opacity="0.8"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="white"
                                        opacity="0.6"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="white"
                                        opacity="0.9"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="relative z-10 text-white font-semibold">
                                    Continue with Google
                                </span>
                            </div>
                        </button>

                        {/* Features List */}
                        <div className="mt-8 space-y-3">
                            {[
                                { icon: "📅", text: "Sync with Google Calendar" },
                                { icon: "🎯", text: "AI-powered goal tracking" },
                                { icon: "🧘", text: "Wellness & focus tools" }
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 text-slate-300 text-sm animate-fade-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <span className="text-xl">{feature.icon}</span>
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Privacy Note */}
                        <p className="mt-6 text-xs text-center text-slate-500">
                            By continuing, you agree to our terms of service and privacy policy
                        </p>
                    </div>
                )}

                {authState === "authenticating" && (
                    <div className="text-center animate-scale-in">
                        {/* Animated Icon Container */}
                        <div className="relative inline-flex items-center justify-center mb-8">
                            {/* Pulse Rings */}
                            {[0, 1, 2].map((ring) => (
                                <div
                                    key={ring}
                                    className="absolute w-32 h-32 rounded-full border-2"
                                    style={{
                                        borderColor: pulseRings >= ring ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.2)",
                                        transform: `scale(${1 + ring * 0.3})`,
                                        transition: "all 0.6s ease-out",
                                        opacity: pulseRings >= ring ? 1 : 0.3,
                                    }}
                                />
                            ))}

                            {/* Center Icon */}
                            <div
                                className="relative w-32 h-32 rounded-full flex items-center justify-center animate-spin-slow"
                                style={{
                                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                    boxShadow: "0 0 60px rgba(59, 130, 246, 0.8)"
                                }}
                            >
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <rect x="15" y="20" width="30" height="6" rx="3" fill="white" opacity="0.9" />
                                    <rect x="15" y="34" width="30" height="6" rx="3" fill="white" opacity="0.6" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-3 animate-pulse">
                            Authenticating
                        </h2>
                        <p className="text-slate-400 animate-fade-in">
                            Connecting to server...
                        </p>

                        {/* Loading Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {[0, 1, 2].map((dot) => (
                                <div
                                    key={dot}
                                    className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                                    style={{ animationDelay: `${dot * 150}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {authState === "success" && (
                    <div
                        className="text-center animate-scale-in"
                        style={{
                            animation: "scaleIn 0.5s ease-out"
                        }}
                    >
                        {/* Success Icon with Checkmark */}
                        <div className="relative inline-flex items-center justify-center mb-8">
                            {/* Success Glow */}
                            <div
                                className="absolute w-40 h-40 rounded-full animate-ping"
                                style={{
                                    background: "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)",
                                }}
                            />

                            {/* Main Circle */}
                            <div
                                className="relative w-32 h-32 rounded-full flex items-center justify-center animate-scale-in"
                                style={{
                                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                    boxShadow: "0 0 60px rgba(34, 197, 94, 0.8)"
                                }}
                            >
                                {/* Handshake Icon */}
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <path
                                        d="M20 30L28 38L40 22"
                                        stroke="white"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="animate-draw-check"
                                    />
                                </svg>

                                {/* Small Success Badge */}
                                <div
                                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center animate-bounce"
                                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 10L9 13L14 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-3 animate-fade-in">
                            Access Granted
                        </h2>
                        <p className="text-emerald-400 animate-fade-in font-medium">
                            Redirecting to your dashboard...
                        </p>
                    </div>
                )}

                {authState === "error" && (
                    <div className="text-center animate-shake">
                        <div
                            className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6"
                            style={{
                                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)"
                            }}
                        >
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <path d="M20 20L40 40M40 20L20 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Authentication Failed
                        </h2>
                        <p className="text-slate-400">
                            Please try again
                        </p>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, 20px) scale(1.1); }
                }
                @keyframes slide-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { 
                        opacity: 0; 
                        transform: scale(0.8); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1); 
                    }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                @keyframes draw-check {
                    from { stroke-dashoffset: 100; }
                    to { stroke-dashoffset: 0; }
                }
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.5s ease-out;
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                .animate-draw-check {
                    stroke-dasharray: 100;
                    animation: draw-check 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-900">
                    <div className="text-white">Loading...</div>
                </div>
            }
        >
            <LoginContent />
        </Suspense>
    );
}
