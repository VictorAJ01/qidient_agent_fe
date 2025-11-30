export type CustomModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

export type NotificationSlideOverProps = Pick<
  CustomModalProps,
  "isOpen" | "onClose"
>;

export interface SessionExpirationModalProps
  extends Pick<CustomModalProps, "isOpen" | "onClose" | "onOpenChange"> {
  errorMessage: string;
  onPress: () => void;
}
