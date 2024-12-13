const nodemailer = require('nodemailer');

// Configuration du transporteur
const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'esmaelakrimi@yahoo.fr',
        pass: 'zewydjxljtpnndfy',
    },
});

// Génération du HTML pour le récapitulatif du panier
const generateOrderSummary = (cartItems, totalPrice) => {
    const itemsHtml = cartItems
        .map(
            (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">€${item.price.toFixed(2).replace('.', ',')}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">€${(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
      </tr>`
        )
        .join('');

    return `
    <h1>Merci pour votre commande chez L'Arbre En Vie !</h1>
    <p>Voici le récapitulatif de votre commande :</p>
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
      <thead>
        <tr>
          <th style="padding: 8px; border: 1px solid #ddd;">Produit</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Quantité</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Prix Unitaire</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Prix Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
    <h3 style="text-align: right;">Total : €${totalPrice.replace('.', ',')}</h3>
    <p>Nous espérons que vous apprécierez vos produits. Merci pour votre confiance !</p>
  `;
};

// Fonction d'envoi de l'email
const sendOrderConfirmation = async (toEmail, cartItems, totalPrice) => {
    const mailOptions = {
        from: '"L’Arbre En Vie" <esmaelakrimi@yahoo.fr>',
        to: toEmail,
        subject: 'Confirmation de votre commande',
        html: generateOrderSummary(cartItems, totalPrice),
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmation };
