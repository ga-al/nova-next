"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal, flushSync } from "react-dom";

import styles from "./ContactForm.module.css";
import { useTranslations } from "next-intl";

type FormStatus = "idle" | "loading" | "error" | "success";

interface ContactFormProps {
  handleClose: () => void;
  isOpen: boolean;
}

export default function ContactForm({ handleClose, isOpen }: ContactFormProps) {
  const t = useTranslations("contactForm");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("modal-open");
      nameInputRef.current?.focus();
    } else if (dialog.open) {
      dialog.close();
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setStatus("idle");
      formRef.current?.reset();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) handleClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading" || status === "success" || !formRef.current) return;

    flushSync(() => {
      setStatus("loading");
    });

    try {
      const formData = new FormData(formRef.current);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          contact: String(formData.get("contact") ?? ""),
          message: String(formData.get("message") ?? ""),
          consent: formData.get("consent") === "on",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      formRef.current?.reset();
      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, 3000);
    } catch {
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby="modal-title"
      onClose={handleClose}
      onClick={handleDialogClick}
    >
      <form
        className={styles.modal__form}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <header className={styles.modal__head}>
          <h2 id="modal-title">{t("title")}</h2>
          <button
            className={styles.modal__close}
            type="button"
            aria-label={t("close")}
            onClick={handleClose}
          >
            ×
          </button>
        </header>
        <label className={styles.field}>
          <span>{t("name")}</span>
          <input type="text" name="name" required ref={nameInputRef} />
        </label>
        <label className={styles.field}>
          <span>{t("phone")}</span>
          <input
            type="text"
            name="contact"
            inputMode="tel"
            autoComplete="tel"
            required
          />
        </label>
        <label className={styles.field}>
          <span>{t("message")}</span>
          <textarea
            name="message"
            placeholder={t("placeholder")}
            rows={4}
            required
          />
        </label>
        <label className={styles.consent}>
          <input type="checkbox" name="consent" required />
          <span>{t("consent")}</span>
        </label>
        <button
          className="btn btn--primary btn--block"
          type="submit"
          disabled={status === "loading" || status === "success"}
          aria-busy={status === "loading"}
        >
          {status === "loading" ? (
            <span className={styles.loading} />
          ) : (
            t("send")
          )}
        </button>
        {status === "error" && (
          <p className={styles.modal__note} role="alert">
            {t("error")}
          </p>
        )}
        {status === "success" && (
          <p className={styles.modal__success} role="status">
            {t("success")}
          </p>
        )}
      </form>
    </dialog>,
    document.body,
  );
}
