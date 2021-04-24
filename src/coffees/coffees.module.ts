import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffess.constants';
import { Connection } from 'typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers:[CoffeesController], 
    providers:[CoffeesService, 
        {provide:COFFEE_BRANDS, useFactory: async (connection:Connection): Promise<string[]> => {
            const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
            console.log('[!] Async Factory')
            return coffeeBrands
            },
            scope:Scope.TRANSIENT
        },
    ],
    exports: [CoffeesService]
})
export class CoffeesModule {}
