import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaleService } from './tale.service';
import { Tale } from 'src/interfaces/tale.interface';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('tale')
export class TaleController {

    constructor(
        @Inject()
        private taleService: TaleService
    ) { }

    @Post("create")
    async createTale(@Body() tale: Tale, @Req() req: Request) {
        let user: any = req.user;
        if (!user) return { error: "User not found" };
        return await this.taleService.createTale(tale, user.id);
    }

    @Patch("update/:id")
    async updateTale(@Body() tale: Tale, @Param("id") id: string, @Req() req: Request) {
        let user: any = req.user;
        if (!user) return { error: "User not found" };
        return await this.taleService.updateTale(tale, id, user.id);
    }

    @Delete("delete/:id")
    async deleteTale(@Param("id") id: string, @Req() req: Request) {
        let user: any = req.user;
        if (!user) return { error: "User not found" };
        return await this.taleService.deleteTale(id, user.id);
    }

    @Get("all")
    async allTales() {
        return await this.taleService.allTales();
    }

    @Get(":id")
    async viewTale(@Param("id") id: string, @Req() req: Request) {
        let user: any = req.user;
        if (!user) return { error: "User not found" };
        return await this.taleService.viewTale(id, user.id);
    }
}
