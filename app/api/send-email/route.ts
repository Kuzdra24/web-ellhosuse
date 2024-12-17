import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0ec80056e79fff",
        pass: "cb512f5c377a98",
    },
});

// Funkcja generująca treść e-maila za pomocą EJS
async function generateEmailTemplate(formData: Record<string, any>) {
    const { name, email, phone, region, homeType, city, price, area, listingDate, saleDate, applyType } = formData;

    // Formatowanie dat do czytelnej postaci
    const formattedListingDate = listingDate ? new Date(listingDate).toLocaleDateString('pl-PL') : 'Nie podano';
    const formattedSaleDate = saleDate ? new Date(saleDate).toLocaleDateString('pl-PL') : 'Nie podano';

    // Ścieżka do pliku szablonu
    const templatePath = path.resolve('app/templates/emailTemplate.ejs');

    // Renderowanie szablonu EJS
    const htmlContent = await ejs.renderFile(templatePath, {
        name,
        email,
        phone,
        region,
        homeType,
        city,
        price,
        area,
        formattedListingDate,
        formattedSaleDate,
        applyType
    });

    return htmlContent;
}

// Funkcja wysyłająca mail
async function sendMail(formData: Record<string, any>) {
    const mailOptions = {
        from: '"Twoja Strona" <your-email@example.com>', // Nadawca
        to: "client-email@example.com", // 
        subject: "Nowe zgłoszenie z formularza", // Temat wiadomości
        html: await generateEmailTemplate(formData), // Generowana treść HTML
    };

    return transporter.sendMail(mailOptions);
}

// Endpoint API
export async function POST(req: Request) {
    try {
        const formData = await req.json();

        // Wysyłanie maila
        await sendMail(formData);

        // Zwrócenie odpowiedzi
        return NextResponse.json({ success: true, message: 'E-mail został wysłany.' });
    } catch (error) {
        console.error('Błąd wysyłania e-maila:', error);
        return NextResponse.json({ success: false, message: 'Nie udało się wysłać e-maila.'+error }, { status: 500 });
    }
}
