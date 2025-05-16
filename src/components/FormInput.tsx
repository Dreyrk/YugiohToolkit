"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FormInputProps } from "@/types";

export default function FormInput({
  id,
  label,
  type,
  name = id,
  Logo,
  placeholder,
  error,
  disabled,
  required,
  autoComplete,
  onBlur,
  onChange,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-required": ariaRequired,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex">
      {Logo && (
        <div className="grid w-8 h-8 text-black place-content-center pr-3">
          <Logo size={30} />
        </div>
      )}
      <div className="relative w-full">
        <input
          id={id}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          placeholder={placeholder || label}
          autoComplete={autoComplete}
          className={`w-full h-8 px-2 py-1 text-gray-900 placeholder-transparent border-b-2 rounded-lg peer focus:outline-none transition-colors ${
            error ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-purple-600"
          }`}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
          aria-required={ariaRequired}
        />
        <label
          htmlFor={id}
          className="absolute text-sm text-gray-600 transition-all left-1 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:left-1 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:font-light peer-focus:text-sm">
          {label}
        </label>
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-1 text-black top-1.5 no-style-btn"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
            {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </button>
        )}
        {error && (
          <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
