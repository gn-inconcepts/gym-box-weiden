"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
        honeypot: "", // Hidden field for spam protection
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ein Fehler ist aufgetreten");
            }

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                interest: "",
                message: "",
                honeypot: "",
            });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-brand-dark p-8 md:p-12 rounded-3xl border border-white/5" noValidate>
            {/* Status Messages — aria-live region for screen readers */}
            <div aria-live="polite" aria-atomic="true">
                {/* Success Message */}
                {status === "success" && (
                    <div className="p-4 bg-brand-green/20 border border-brand-green rounded-lg text-brand-green" role="status">
                        Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei dir.
                    </div>
                )}

                {/* Error Message */}
                {status === "error" && (
                    <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400" role="alert" id="form-error">
                        {errorMessage}
                    </div>
                )}
            </div>

            {/* Honeypot field (hidden from users and assistive technology) */}
            <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-brand-gray">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors"
                        placeholder="Dein Name"
                        required
                        aria-required="true"
                        disabled={status === "loading"}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-brand-gray">
                        E-Mail *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors"
                        placeholder="deine@email.com"
                        required
                        aria-required="true"
                        disabled={status === "loading"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-brand-gray">
                        Telefon
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors"
                        placeholder="+43 ..."
                        disabled={status === "loading"}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-bold uppercase tracking-wider text-brand-gray">
                        Interesse an
                    </label>
                    <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors appearance-none"
                        disabled={status === "loading"}
                    >
                        <option value="">Bitte wählen...</option>
                        <option value="erstberatung">Kostenlose Erstberatung</option>
                        <option value="gym">Das Gym — Mitgliedschaft</option>
                        <option value="box">The Box — CrossFit</option>
                        <option value="personal">Personal Training</option>
                        <option value="analyse">Körperanalyse / Gesundheitscheck</option>
                        <option value="ernaehrung">Ernährungscoaching</option>
                        <option value="physio">Physiotherapie</option>
                        <option value="firmen">Firmen-Fitness</option>
                        <option value="kinder">Kindertraining</option>
                        <option value="sonstiges">Sonstiges</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-brand-gray">
                    Nachricht *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors"
                    placeholder="Wie können wir dir helfen?"
                    required
                    aria-required="true"
                    disabled={status === "loading"}
                ></textarea>
            </div>

            <Button
                type="submit"
                className="w-full md:w-auto px-12 py-6 text-lg bg-brand-green text-brand-black font-bold rounded-lg hover:bg-white hover:text-brand-black active:bg-white active:text-brand-black transition-colors disabled:opacity-60"
                disabled={status === "loading"}
                aria-disabled={status === "loading"}
                aria-describedby={status === "error" ? "form-error" : undefined}
            >
                {status === "loading" ? "Wird gesendet..." : "Absenden"}
            </Button>
        </form>
    );
}
