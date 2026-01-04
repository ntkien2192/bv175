'use client';
import React from 'react';
import NextImg from '../../common/next-img';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ContactInfo, fnSendContact } from '@/src/services/contact';
import { cn } from '@/src/lib/utils';
import { useTranslations } from 'next-intl';

const initialValue: ContactInfo = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function FormContact({ buttonTitle = 'Send' }: any) {
  const t = useTranslations();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState<boolean>(false);

  const CONTACT_SCHEMA = useMemo(
    () =>
      yup
        .object({
          name: yup
            .string()
            .max(50, t('Validate.name.length'))
            .required(t('Validate.name.required')),
          phone: yup
            .string()
            .max(20, t('Validate.phone.length'))
            .required(t('Validate.phone.required'))
            .test('is-valid-phone', t('Validate.phone.invalid'), (value) => {
              if (!value) return false;
              const phoneNot84 = /[0]{1}[35789]{1}[0-9]{8}$/;
              const phone84 = /^[84]{2}[35789]{1}[0-9]{8}$/;
              const phone024 = /^[024]{2}[23456789]{1}[0-9]{8}$/;
              return (
                phoneNot84.test(value) ||
                phone84.test(value) ||
                phone024.test(value)
              );
            }),
          email: yup
            .string()
            .transform((value, originalValue) =>
              originalValue === '' ? null : value,
            )
            .required(t('Validate.email.required'))
            .max(50, t('Validate.email.length'))
            .email(t('Validate.email.invalid'))
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              t('Validate.email.invalid'),
            ),
          message: yup
            .string()
            .max(1000, t('Validate.message.length'))
            .notRequired(),
        })
        .required(),
    [],
  );

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<ContactInfo>({
    resolver: yupResolver(CONTACT_SCHEMA as any),
    defaultValues: initialValue,
  });

  const inputs = useMemo(
    () => [
      {
        key: 'name',
        placeholder: t('Validate.name.placeholder'),
        className: 'col-span-full md:col-span-1',
      },
      {
        key: 'phone',
        placeholder: t('Validate.phone.placeholder'),
        className: 'col-span-full md:col-span-1',
      },
      {
        key: 'email',
        placeholder: t('Validate.email.placeholder'),
        className: 'col-span-full',
      },
    ],
    [],
  );

  const onSubmit: SubmitHandler<ContactInfo> = async (data) => {
    setLoading(true);

    try {
      if (!executeRecaptcha) {
        throw new Error(t('Notification.error.recapcha-not-ready'));
      }
      const token = await executeRecaptcha('review_form');

      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyRes.ok) {
        toast.error(t('Notification.error.verify-recapcha'), {
          style: {
            padding: 16,
            borderRadius: 16,
            color: '#80122E',
            backgroundColor: '#FCECF0',
          },
        });
        setLoading(false);
        return;
      }

      const response = await fnSendContact({
        ...data,
        title: 'Thông tin liên hệ',
      });

      if (!response) {
        throw new Error(t('Notification.error.contact'));
      }
      toast.success(t('Notification.success.contact'), {
        style: {
          padding: 16,
          borderRadius: 16,
          color: '#136C34',
          backgroundColor: '#F4FCF7',
        },
      });
      reset(initialValue);
    } catch (error) {
      toast.error(t('Notification.error.contact'), {
        style: {
          padding: 16,
          borderRadius: 16,
          color: '#80122E',
          backgroundColor: '#FCECF0',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-2 gap-y-5 md:gap-x-6 md:gap-y-6 xl:gap-y-8 2xl:gap-y-9 3xl:gap-y-10"
    >
      {inputs?.map((input: any) => (
        <div key={input?.key} className={cn('', input?.className)}>
          <input
            {...register(input?.key)}
            autoComplete="off"
            aria-describedby="outlined_error_help"
            type="text"
            className="w-full border-b-[1px] border-gray-500 bg-transparent p-[8px_12px] text-base font-medium text-gray-950 outline-none placeholder:font-normal placeholder:text-gray-500 lg:p-[10px_14px] lg:text-base 2xl:p-[10px_16px] 2xl:text-lg"
            placeholder={input?.placeholder}
          />

          {(errors[input.key as keyof ContactInfo] || !watch(input?.key)) &&
            isSubmitted && (
              <p
                id="outlined_error_help"
                className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:mt-2 lg:text-sm 2xl:mt-3 ${
                  errors[input.key as keyof ContactInfo] ? 'block' : 'hidden'
                }`}
              >
                <span className="font-medium">
                  {errors[input.key as keyof ContactInfo]?.message}
                </span>
              </p>
            )}
        </div>
      ))}

      <div className="col-span-full">
        <textarea
          {...register('message')}
          rows={3}
          autoComplete="off"
          aria-describedby="outlined_error_help"
          placeholder={t('Validate.message.placeholder')}
          className="w-full border-b-[1px] border-gray-500 bg-transparent p-[8px_12px] text-base font-medium text-gray-950 outline-none placeholder:font-normal placeholder:text-gray-500 lg:p-[10px_14px] lg:text-base 2xl:p-[10px_16px] 2xl:text-lg"
        />
        {errors.message && isSubmitted && (
          <p
            id="outlined_error_help"
            className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:text-sm ${
              errors.message ? 'block' : 'hidden'
            }`}
          >
            <span className="font-medium">{errors?.message?.message}</span>
          </p>
        )}
      </div>

      <div className="col-span-full pt-4 md:pt-0">
        <button
          type="submit"
          disabled={loading}
          className="relative w-full overflow-hidden rounded-[6px] bg-[#E50000] p-[8px_20px] text-base text-white md:w-fit lg:p-[10px_24px] lg:text-lg"
        >
          {buttonTitle}

          <div
            className={`absolute inset-0 z-[1] flex size-full items-center justify-center bg-[#E50000] ${loading ? 'block' : 'hidden'}`}
          >
            <div className="relative size-4 animate-spin">
              <NextImg
                src="/assets/icons/loading_spin.svg"
                alt="loading spin"
              />
            </div>
          </div>
        </button>
      </div>
    </form>
  );
}
