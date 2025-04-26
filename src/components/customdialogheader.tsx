import { LucideIcon } from "lucide-react";
import React from "react";
import { DialogHeader } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

const CustomDialogHeader = (props: Props) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle>
        <div className="flex flex-col items-center gap-1 mb-2">
          {props.icon && <props.icon className={cn("stroke-primary", props.iconClassName)} />}
          {props.title && <p className={cn("text-xl text-primary", props.titleClassName)}>{props.title}</p>}
          {props.subTitle && (
            <p className={cn("text-sm text-muted-foreground", props.subTitleClassName)}>{props.subTitle}</p>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};

export default CustomDialogHeader;
