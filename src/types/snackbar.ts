export type ISnackbarProps = {
  show: boolean;
  severity: 'success' | 'error' | undefined;
  message: string | undefined;
};
