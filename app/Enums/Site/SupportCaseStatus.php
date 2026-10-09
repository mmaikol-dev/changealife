<?php

namespace App\Enums\Site;

enum SupportCaseStatus: string
{
    case Open = 'open';
    case Ongoing = 'ongoing';
    case Closed = 'closed';

    public function label(): string
    {
        return match ($this) {
            self::Open => 'Open',
            self::Ongoing => 'Ongoing',
            self::Closed => 'Closed',
        };
    }
}
