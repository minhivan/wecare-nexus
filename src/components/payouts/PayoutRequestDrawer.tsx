import { useState } from "react";
import { Building2, Check, DollarSign } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface PayoutRequestDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PayoutRequestDrawer = ({ open, onOpenChange }: PayoutRequestDrawerProps) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    campaign: "",
    account: "chase",
    amount: "",
  });

  const availableBalance = 47892;

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        setStep(1);
        setFormData({ campaign: "", account: "chase", amount: "" });
      }, 2000);
    }, 2000);
  };

  const isAmountValid = formData.amount && parseFloat(formData.amount) <= availableBalance;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        {!success && !processing && (
          <>
            <SheetHeader>
              <SheetTitle>Request New Payout</SheetTitle>
              <SheetDescription>
                Withdraw funds from your available balance to your bank account
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Step 1: Select Campaign */}
              <div className="space-y-3">
                <Label>Select Campaign</Label>
                <Select
                  value={formData.campaign}
                  onValueChange={(value) => setFormData({ ...formData, campaign: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ocean">Save the Ocean - $15,420</SelectItem>
                    <SelectItem value="education">Education for All - $8,900</SelectItem>
                    <SelectItem value="winter">Winter Relief - $23,500</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Step 2: Select Bank Account */}
              <div className="space-y-3">
                <Label>Select Bank Account</Label>
                <RadioGroup
                  value={formData.account}
                  onValueChange={(value) => setFormData({ ...formData, account: value })}
                  className="space-y-2"
                >
                  <Card className="p-4 cursor-pointer hover:bg-card/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="chase" id="chase" />
                      <label htmlFor="chase" className="flex items-center gap-3 flex-1 cursor-pointer">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald/20 to-cyan/20 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-emerald" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Chase Bank</p>
                          <p className="text-sm text-muted-foreground">****4532</p>
                        </div>
                      </label>
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer hover:bg-card/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="boa" id="boa" />
                      <label htmlFor="boa" className="flex items-center gap-3 flex-1 cursor-pointer">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-cyan" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Bank of America</p>
                          <p className="text-sm text-muted-foreground">****7821</p>
                        </div>
                      </label>
                    </div>
                  </Card>
                </RadioGroup>
              </div>

              {/* Step 3: Enter Amount */}
              <div className="space-y-3">
                <Label>Payout Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="font-medium text-emerald">
                    ${availableBalance.toLocaleString()}
                  </span>
                </div>
                {formData.amount && !isAmountValid && (
                  <p className="text-xs text-destructive">
                    Amount exceeds available balance
                  </p>
                )}
              </div>

              {/* Summary Card */}
              <Card className="p-4 bg-gradient-to-br from-emerald/5 to-cyan/5 border-emerald/20">
                <h4 className="font-medium text-foreground mb-3">Review Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payout Amount</span>
                    <span className="text-foreground font-medium">
                      ${formData.amount || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Fee</span>
                    <span className="text-foreground font-medium">
                      ${formData.amount ? (parseFloat(formData.amount) * 0.03).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between">
                    <span className="text-foreground font-medium">Total Deducted</span>
                    <span className="text-foreground font-semibold">
                      ${formData.amount ? (parseFloat(formData.amount) * 1.03).toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>
              </Card>

              <Button
                className="w-full bg-emerald hover:bg-emerald/90 text-white shadow-lg hover:shadow-emerald/25"
                disabled={!formData.campaign || !formData.amount || !isAmountValid}
                onClick={handleSubmit}
              >
                Request Payout
              </Button>
            </div>
          </>
        )}

        {processing && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald/20 to-cyan/20 flex items-center justify-center mb-4 animate-pulse">
              <DollarSign className="h-8 w-8 text-emerald" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Processing Payout...</h3>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we process your request
            </p>
          </div>
        )}

        {success && (
          <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald/20 to-cyan/20 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-emerald" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Payout Requested!</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your payout request has been submitted successfully
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
