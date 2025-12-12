import { generateIndexes } from '@/helpers/generateIndexes';
import { IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Image,
  Link,
  Text,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  // rendering item id
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      {/* Thin, clean strip similar to Henry Schein metrics bar */}
      <div className="bg-color-background border border-y">
        <div className="container py-6 md:py-8">
          {/* Optional section label above the strip */}
          {featureSectionTitle?.jsonValue?.value && (
            <div className="mb-4 flex justify-center">
              <h2 className="text-foreground-muted inline-flex flex-col items-center text-xs font-semibold tracking-[0.25em] uppercase">
                <Text field={featureSectionTitle.jsonValue} />
                {!hideAccentLine && <AccentLine className="mt-2 h-1 w-24" />}
              </h2>
            </div>
          )}

          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12 lg:gap-20">
            {results.map((item, index) => {
              const title = item.featureTitle.jsonValue;
              const description = item.featureDescription.jsonValue;
              const link = item.featureLink.jsonValue;
              const imageField = item.featureImage.jsonValue;

              return (
                <div className="flex items-center justify-center gap-6 md:gap-8" key={index}>
                  {/* Icon + text block */}
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Icon */}
                    {imageField?.value?.src && (
                      <div className="flex h-8 w-8 items-center justify-center md:h-9 md:w-9">
                        <Image field={imageField} className="h-full w-full object-contain" />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex flex-col items-center md:items-start">
                      {/* Bold primary metric line */}
                      <div className="text-accent text-center text-sm font-extrabold tracking-wide uppercase md:text-base">
                        <Text field={title} />
                      </div>

                      {/* Optional supporting copy below */}
                      {description?.value && (
                        <div className="text-foreground-muted mt-1 text-center text-xs md:text-left md:text-sm">
                          <Text field={description} />
                        </div>
                      )}

                      {/* Optional link (kept subtle, below metric text) */}
                      {link?.value?.href && (
                        <div className="mt-1 hidden md:block">
                          <Link
                            field={link}
                            className="text-accent text-xs font-semibold underline-offset-2 hover:underline"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vertical divider between items (desktop only) */}
                  {index < results.length - 1 && (
                    <div className="bg-border hidden h-10 w-px md:block" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-9 md:grid-cols-2 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-9 lg:py-2" key={index}>
              {imageField && <Image field={imageField} className="max-h-20 object-contain" />}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-20 md:flex-row lg:gap-20">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start 2xl:w-80" key={index}>
              {/* Image */}
              <div className="bg-accent mb-7 flex h-20 w-20 items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 leading-0.5">
                  <Text tag="h5" className="text-accent" field={title} />
                </div>
                <div className="text-background-muted-light text-center">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-24 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group text-background hover:bg-accent cursor-pointer rounded-xl p-6"
              key={index}
            >
              {/* Generated Number */}
              <h1 className="group-hover:text-background text-background-muted-dark mb-2 text-7xl leading-24">
                {generateIndexes(index)}
              </h1>
              {/* Title and Description */}
              <div>
                <div className="text-accent group-hover:text-background mb-4 text-2xl leading-8 font-[700]">
                  <Text field={title} />
                </div>
                <div className="text-background-muted-dark group-hover:text-background leading-7">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-20 py-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="grid grid-cols-[1fr_2fr] gap-2.5" key={index}>
              {/* Image */}
              <div className="flex items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col justify-center">
                <div className="text-xl leading-9 font-bold">
                  <Text className="text-foreground" field={title} />
                </div>
                <div className="text-background-muted-light leading-8">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="outline-non container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div key={index}>
              <div className="mb-7 aspect-4/3 w-full overflow-hidden rounded-lg bg-white">
                <Image field={image} className="h-full w-full object-cover" />
              </div>

              <h6>
                <Text field={title} />
              </h6>

              <p className="text-foreground-muted mt-1 text-lg">
                <Text field={description} />
              </p>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
