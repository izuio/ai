document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.getElementById('customMailtoShareTrigger');

    if (shareButton) {
        shareButton.addEventListener('click', function() {
            const postTitle = this.dataset.title;
            const postUrl = this.dataset.url;
            const imageUrl = this.dataset.imageUrl;
            const plainExcerpt = this.dataset.plainExcerpt;

            const siteName = "TheAnalysis.news"; // Ensure this is correct

            const subject = `Check out: ${postTitle}`; // Shorter subject

            // Function to escape HTML characters for insertion into HTML content
            function escapeHtml(unsafe) {
                if (typeof unsafe !== 'string') { 
                    return '';
                }
                return unsafe
                    .replace(/&/g, "&amp;")   // CORRECTED
                    .replace(/</g, "&lt;")    // CORRECTED
                    .replace(/>/g, "&gt;")    // CORRECTED
                    .replace(/"/g, "&quot;")  // CORRECTED
                    .replace(/'/g, "&#039;"); // CORRECTED
            }

            let bodyParts = [];

            // --- Constructing the body with minimal HTML and inline styles ---
            // Greeting
            bodyParts.push('<p style="font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 1em;">Hi,</p>');
            bodyParts.push(`<p style="font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 1em;">I thought you might find this article interesting from ${escapeHtml(siteName)}:</p>`);

            // Title (as link)
            bodyParts.push(`<p style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; margin-bottom: 0.5em;"><a href="${postUrl}" style="color: #007bff; text-decoration: none;">${escapeHtml(postTitle)}</a></p>`);
            
            // Featured Image (if available)
            if (imageUrl) {
                bodyParts.push('<div style="margin-top: 15px; margin-bottom: 15px;">');
                bodyParts.push(`<a href="${postUrl}" style="text-decoration: none; display: block;">`);
                bodyParts.push(`<img src="${imageUrl}" alt="${escapeHtml(postTitle)}" style="max-width: 100%; height: auto; border: 1px solid #cccccc; display: block;">`);
                bodyParts.push('</a></div>');
            }

            // Excerpt (if available)
            if (plainExcerpt) {
                let processedExcerpt = escapeHtml(plainExcerpt);
                processedExcerpt = processedExcerpt.replace(/\n/g, '<br>'); 
                bodyParts.push('<p style="font-family: Arial, sans-serif; font-size: 14px; margin-top: 1em; margin-bottom: 1em; line-height: 1.6;">' + processedExcerpt + '</p>');
            }
            
            // Footer
            bodyParts.push('<hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">');
            bodyParts.push(`<p style="font-family: Arial, sans-serif; font-size: 12px; color: #777777;">Shared from: <a href="${window.location.origin}" style="color: #007bff; text-decoration: none;">${escapeHtml(siteName)}</a></p>`);
            bodyParts.push('<p style="font-family: Arial, sans-serif; font-size: 14px;">Thanks,<br>[Your Name Here]</p>');

            const bodyHtml = bodyParts.join('');

            const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyHtml)}`;

            console.log("--- Mailto Share Data ---");
            console.log("Title:", postTitle);
            console.log("URL:", postUrl);
            console.log("Image URL:", imageUrl);
            console.log("Plain Excerpt:", plainExcerpt);
            console.log("--- Final Body HTML (before encoding) ---");
            console.log(bodyHtml);
            console.log("--- Full mailto link (length: " + mailtoLink.length + ") ---");
            console.log(mailtoLink);

            if (mailtoLink.length > 1800) {
                console.warn("Mailto link is getting long (" + mailtoLink.length + " chars). Test thoroughly on various clients, especially Outlook.");
            }

            window.location.href = mailtoLink;
        });
    }
});