import { useMediaQuery } from "react-responsive";

import Dialog from "./Dialog";
import Drawer from "./Drawer";
import type PopUpProps from "./pop_up_props";

interface ResponsiveDialogProps extends PopUpProps {}

export function ResponsiveDialog(props: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return isDesktop ? <Dialog {...props} /> : <Drawer {...props} />;
}

export default ResponsiveDialog;
