import type { Image, ImageRequireSource, ImageURISource, StyleProp, ViewStyle } from 'react-native';

export interface ImageData {
  src: ImageRequireSource | ImageURISource;
  zoomSrc?: ImageRequireSource | ImageURISource;
}

export interface ZoomCarouselProps {
  images: ImageData[];
  gapSize?: number;
  centerMode?: boolean;
  hideZoomButton?: boolean;
  fillContainer?: boolean;
  peekSize?: number;
  showArrow?: boolean;
  pageIndicatorZoomStyle?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  dotActiveStyle?: StyleProp<ViewStyle>;
  pageIndicatorStyle?: StyleProp<ViewStyle>;
  zoomButtonStyle?: StyleProp<ViewStyle>;
  renderImage?: (
    item: ImageData,
    index: number,
    originalImgs: Array<Image | null>,
    imageWidth: number,
    imageHeight: number,
    openZoom: () => void
  ) => JSX.Element;
  renderImageWeb?: (data: unknown, i: number) => JSX.Element;
  renderCloseButton?: (closeZoom: () => void) => JSX.Element;
  renderModalContent?: (closeModal: () => void) => JSX.Element;
  renderPageIndicator?: (currentIndex: number, itemsCount: number) => JSX.Element;
  renderZoomButton?: (openZoom: () => void) => JSX.Element;
  renderThumbnails?: (
    currentIndex: number,
    goTo: (index: number, options: unknown) => void
  ) => JSX.Element;
  nextArrowOnBlur?: () => void;
  showThumbnails?: boolean;
  thumbnailStyle?: StyleProp<ViewStyle>;
  thumbnailContainerStyle?: StyleProp<ViewStyle>;
  hideOverflow?: boolean;

  /**
   * The styling of the container that holds the image carousel and thumbnails
   *
   * @example {{flex: 1}}
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Boolean to turn on and off the page indicator (dots)
   *
   * @example true
   */
  hidePageIndicator?: boolean;

  /**
   * The styling of the container that holds just the image carousel
   *
   * @example {{minHeight: 400px}}
   */
  imageContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Dictates whether the default image counter displays
   *
   * @example true
   */
  showImageCounter?: boolean;

  /**
   * Custom styling for the imageCounter. Use absolute positioning to set the location
   *
   * @example {{position: 'absolute'}}
   */
  imageCounterStyle?: StyleProp<ViewStyle>;

  /**
   * custom image counter rendering. This function is called last inside the carousel container
   *
   * @example const renderImageCounter = (currentIndex: number) => (<View>1/2</View>)
   */
  renderImageCounter?: (currentIndex: number) => JSX.Element;
}
