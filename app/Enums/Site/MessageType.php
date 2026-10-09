<?php

namespace App\Enums\Site;

enum MessageType: string
{
    case Contact = 'contact';
    case TechnicalAssistance = 'technical_assistance';
    case Newsletter = 'newsletter';

    public function label(): string
    {
        return match ($this) {
            self::Contact => 'Contact',
            self::TechnicalAssistance => 'Technical Assistance Enquiry',
            self::Newsletter => 'Newsletter Subscription',
        };
    }
}
