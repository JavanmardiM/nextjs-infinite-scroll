/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";
import { forwardRef, type ForwardedRef } from "react";

type Props = ImageProps & { disableAnimation?: boolean };

export default forwardRef(function NextImageFix(
  props: Props,
  ref: ForwardedRef<Props>,
) {
  const { disableAnimation, ...rest } = props as Props;

  return <Image ref={ref as any} {...rest} />;
});
