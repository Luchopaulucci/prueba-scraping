import { firefox } from "playwright";

const browser = await firefox.launch({ headless: true });

const page = await browser.newPage();

await page.goto(
  'https://www.amazon.com/-/es/hz/mobile/mission/?_encoding=UTF8&p=Fy26dv5eVxmI%2FkVWm5sOyG7FG61ywoOkMiK%2BtQVkM%2BwV2R34MXqlxr4gqqyauNbj%2FKlxuwf0EZOTYvoGArDA0YPuboZ8Zj1CuMalK5wHlO5wqdjmFzi5EOcI%2FGkkHckM0OvTxC8XWQalZmyUxJqumvHMrrvuIu33to17bAliadiir5xxzH3r9BX3I1fZOZmjlSILETOKIBMcQvBXPDiVFeCASEgWdslWgXDFtDY6HYC8UBmt%2BUQ2CuPYvtOhf6QrIKNGHA%2Fe25Iut0LCLU5EW6MzbA3Y4Fi9ECRtElvVnS46TtdtAeAZrtUz8NTieaC6DncI0EbqJleTYLIBokJPZUICyDTqLHy%2B%2FETwHjMvV6RbIVEvll3gyxzOfqa46D5sicdjJyWvjJtFeKdnsMsVq3Fk6Sg56fpob2BqTGxYlbB0VhAAv5uXdZ%2BORPTC1NOOM3G9%2BmPsTFw%3D&pd_rd_w=Xb9Z0&content-id=amzn1.sym.79110ea5-0df1-4550-89d7-0b9bc8b9b0a3%3Aamzn1.symc.ebdd2303-2907-45b9-b343-3896226c508a&pf_rd_p=79110ea5-0df1-4550-89d7-0b9bc8b9b0a3&pf_rd_r=YJYP7XDC91Q0B7DWWE2M&pd_rd_wg=KN1jP&pd_rd_r=59598324-afea-46c3-bd50-19d94858de26&ref_=pd_hp_d_atf_ci_mcx_mr_ca_hp_atf_d'
);

const products = await page.$$eval('div[data-asin]', (results) => {
  return results.map((el) => {
    const title = el.querySelector('a.a-link-normal')?.innerText || "No title found";
    const image = el.querySelector('img')?.getAttribute('src') || "No image found";
    const price = el.querySelector('.a-price .a-offscreen')?.innerText || "No price found";
    const link = el.querySelector('a.a-link-normal')?.getAttribute('href') || "No link found";

    return { title, image, price, link };
  });
});

console.log(products);
await browser.close();
