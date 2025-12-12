import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  const hasImage = fields?.Image?.value?.src;
  const hasVideo = !isPageEditing && fields?.Video?.value?.src;
  const hasMedia = hasImage || hasVideo;

  return (
    <div
      className={`component hero-banner ${styles} relative overflow-hidden ${hasMedia ? '' : 'flex min-h-[600px] items-center lg:min-h-[700px]'}`}
      id={id}
    >
      {/* Background Media */}
      {hasMedia ? (
        <div className="relative w-full">
          {hasVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={fields.Image?.value?.src}
            >
              <source src={fields.Video?.value?.src} type="video/webm" />
            </video>
          ) : hasImage ? (
            <ContentSdkImage field={fields.Image} className="h-auto w-full" priority />
          ) : null}
          {/* Gradient overlay to fade image/video at bottom */}
          {!hideGradientOverlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-85% to-white"></div>
          )}
          {/* Content overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
            <div className="pointer-events-auto h-full w-full overflow-hidden">{children}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-0"></div>
          {children}
        </>
      )}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const isRightAligned = styles.includes('position-right');
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative h-full min-h-0 w-full">
        <div className="container mx-auto h-full px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-8">
          <div
            className={`flex h-full w-full lg:w-1/2 lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="w-full max-w-xl">
              <div className={clsx({ shim: screenLayer })}>
                {/* Title */}
                <h1 className="text-center text-3xl leading-tight font-bold break-words capitalize sm:text-4xl sm:leading-[110%] md:text-5xl md:leading-[110%] lg:text-left lg:text-6xl lg:leading-[110%] xl:text-7xl xl:leading-[130%] 2xl:text-[80px]">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch] lg:mx-0" />}
                </h1>

                {/* Description */}
                <div className="mt-4 text-base break-words sm:mt-5 sm:text-lg md:mt-7 md:text-xl lg:text-2xl">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="text-center lg:text-left"
                  />
                </div>

                {/* CTA Link or Placeholder */}
                <div
                  className={clsx(
                    'mt-4 flex w-full justify-center sm:mt-5 md:mt-6',
                    isRightAligned ? 'lg:justify-end' : 'lg:justify-start'
                  )}
                >
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="arrow-btn" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative h-full min-h-0 w-full">
        <div className="container mx-auto flex h-full justify-center px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-8">
          <div
            className={`flex w-full max-w-4xl flex-col items-center ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx('w-full', { shim: screenLayer })}>
              {/* Title */}
              <h1 className="text-center text-3xl leading-tight font-bold break-words capitalize sm:text-4xl sm:leading-[110%] md:text-5xl md:leading-[110%] lg:text-6xl lg:leading-[110%] xl:text-7xl xl:leading-[130%] 2xl:text-[80px]">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch]" />}
              </h1>

              {/* Description */}
              <div className="mt-4 text-base break-words sm:mt-5 sm:text-lg md:mt-7 md:text-xl lg:text-2xl">
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-4 flex w-full justify-center sm:mt-5 md:mt-6">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="arrow-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
