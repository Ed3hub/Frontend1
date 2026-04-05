import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

interface RoleRadioProps {
  value: string;
  onChange: (value: string) => void;
}

const RoleRadio: React.FC<RoleRadioProps> = ({ value, onChange }) => {
  return (
    <div>
      <p className='text-base pb-2'>Select your role</p>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="learner" id="learner" />
          <Label htmlFor="learner">Learner</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="educator" id="educator" />
          <Label htmlFor="educator">Educator</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

export default RoleRadio
