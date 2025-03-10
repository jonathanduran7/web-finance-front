import { SnackbarType } from "@/app/context/snackbar.context";
import Snackbar from "./snackbar";
import SnackbarError from "./snackbar-error";

interface SnackbarProps {
  message: string;
  duration?: number;
  onClose: () => void;
  type: SnackbarType;
}

export default function SnackbarFactory({
  message,
  duration = 3000,
  onClose,
  type,
}: SnackbarProps) {
  switch (type) {
    case "success":
      return (
        <Snackbar message={message} duration={duration} onClose={onClose} />
      );
    case "error":
      return (
        <SnackbarError
          message={message}
          duration={duration}
          onClose={onClose}
        />
      );
    default:
      return null;
  }
}
