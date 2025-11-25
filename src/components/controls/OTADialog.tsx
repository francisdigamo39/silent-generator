import { Icon } from "@iconify/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type OTADialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: string;
};

export function OTADialog({ open, onOpenChange, device }: OTADialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Over-the-Air Update</DialogTitle>
          <DialogDescription>
            Upload new firmware for device: <span className="font-mono">{device}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label className="text-sm">Firmware File</Label>
            <Input type="file" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>
              <Icon icon="lucide:upload" className="h-4 w-4 mr-2" /> Upload & Install
            </Button>
          </div>
          <Alert>
            <Icon icon="lucide:alert-triangle" className="h-4 w-4" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription className="text-sm">
              Keep device powered and connected to Wi‑Fi. Do not interrupt the process.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}
