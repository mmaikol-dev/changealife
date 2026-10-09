<?php

namespace App\Enums\Site;

enum RecurringFrequency: string
{
    case None = 'None';
    case Daily = 'Daily';
    case Weekly = 'Weekly';
    case Monthly = 'Monthly';
    case Biannually = 'Biannually';
    case Annually = 'Annually';

    public function label(): string
    {
        return $this->value;
    }
}
