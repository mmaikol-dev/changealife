<?php

namespace App\Enums\Site;

enum SupportType: string
{
    case OneTime = 'one_time';
    case Ongoing = 'ongoing';

    public function label(): string
    {
        return match ($this) {
            self::OneTime => 'One-time support',
            self::Ongoing => 'Ongoing support',
        };
    }
}
