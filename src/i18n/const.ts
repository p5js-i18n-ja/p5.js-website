/**
 * The default language to render the language in.
 * ("en" stands for English.) Also used for fallback pages
 * when they don't exist in a locale.
 */
// export const defaultLocale = "en";
export const defaultLocale = "ja";

/**
 * All other locales supported by the website.
 */
// export const nonDefaultSupportedLocales = ["es", "hi", "ko", "zh-Hans", "ja"];
// export const nonDefaultSupportedLocales = ["ja"];
export const nonDefaultSupportedLocales = ["en"];

/**
 * The list of locales (languages) the website
 * can be rendered in, including the default locale
 */
export const supportedLocales = [defaultLocale, ...nonDefaultSupportedLocales];
