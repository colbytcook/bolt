import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../blockquote.schema';
const os = require('os');
const { size, alignItems, border } = schema.properties;
const languages = ['en', 'de', 'fr', 'ja'];

const timeout = 90000;

describe('<bolt-blockquote> component', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, 100);

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
    await page.setViewport({ width: 800, height: 400 });
  }, timeout);

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  }, timeout);

  test('<bolt-blockquote> basic usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
      },
      true,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-blockquote> basic usage w/ author', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-blockquote> indent usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        indent: true,
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  size.enum.forEach(async option => {
    test(`<bolt-blockquote> size variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          size: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  alignItems.enum.forEach(async option => {
    test(`<bolt-blockquote> align variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          alignItems: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );

      // @todo: This step is pointless if we can't wait for the component to be ready.
      // It just returns same markup that goes in.
      // const twigRenderedHTML = results.html;
      // const renderedBlockquoteHTML = await page.evaluate(
      //   async twigRenderedHTML => {
      //     document.body.insertAdjacentHTML('beforeend', `${twigRenderedHTML}`);
      //     const blockquote = document.querySelector('bolt-blockquote');
      //     // @todo: updateComplete Promise not working inside Puppeteer
      //     // await blockquote.updateComplete;
      //     return blockquote.outerHTML;
      //   },
      //   twigRenderedHTML,
      // );

      // const renderedHTML = await html(renderedBlockquoteHTML);
      // expect(renderedHTML).toMatchSnapshot();

      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  border.enum.forEach(async option => {
    test(`<bolt-blockquote> border variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          border: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });

    test(`<bolt-blockquote> border variations with inset: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          border: option,
          inset: true,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`advanced <bolt-blockquote> usage`, async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        border: 'horizontal',
        inset: true,
        logo: {
          invert: true,
          src: '/fixtures/paypal.svg',
        },
        author: {
          image: {
            src: '/fixtures/author.jpg',
            lazyload: false,
          },
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // @todo: This test is pointless if we can't wait for the component to be ready.
  // test('<bolt-blockquote> renders to Shadow DOM', async function() {
  //   const defaultBlockquoteOuter = await page.evaluate(() => {
  //     const blockquote = document.createElement('bolt-blockquote');
  //     blockquote.setAttribute('author-name', 'Chris Heilmann');
  //     blockquote.setAttribute('author-title', 'Developer Evangelist');
  //     blockquote.innerHTML = `
  //       <p>Java is to JavaScript what Car is to Carpet.</p>
  //     `;
  //     document.body.appendChild(blockquote);
  //     document.body.classList.add('u-bolt-padding-medium');
  //     // @todo: updateComplete Promise not working inside Puppeteer
  //     // await blockquote.updateComplete;
  //     return blockquote.outerHTML;
  //   });

  //   // @todo: this Promise never returns
  //   // await page.evaluate(async () => {
  //   //   const selectors = Array.from(
  //   //     document.querySelectorAll('bolt-blockquote'),
  //   //   );
  //   //   return await Promise.all(
  //   //     selectors.map(blockquote => {
  //   //       if (blockquote._wasInitiallyRendered === true) return;
  //   //       return new Promise((resolve, reject) => {
  //   //         blockquote.addEventListener('ready', resolve);
  //   //         blockquote.addEventListener('error', reject);
  //   //       });
  //   //     }),
  //   //   );
  //   // });

  //   const renderedHTML = await html(defaultBlockquoteOuter);
  //   expect(renderedHTML).toMatchSnapshot();
  // });

  // @todo: This step is pointless if we can't wait for the component to be ready.
  // test('<bolt-blockquote> renders to Light DOM', async function() {
  //   const renderedBlockquoteHTML = await page.evaluate(() => {
  //     const blockquote = document.createElement('bolt-blockquote');
  //     blockquote.setAttribute(
  //       'author-name',
  //       'Michelangelo di Lodovico Buonarroti Simoni',
  //     );
  //     blockquote.setAttribute('align-items', 'center');
  //     blockquote.setAttribute('author-title', 'Renaissance Artist');
  //     blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
  //     blockquote.innerHTML = `<img slot="logo" src="/fixtures/paypal-logo.svg" alt="PayPal Logo">
  //       <p>Bolt Blockquote w/ Shadow DOM Manually Disabled</p>
  //       <p>Press any key to continue or any other key to quit.</p>
  //     `;
  //     document.body.appendChild(blockquote);
  //     document.body.classList.add('u-bolt-padding-medium');
  //     blockquote.useShadow = false;
  //     // @todo: updateComplete Promise not working inside Puppeteer
  //     // await blockquote.updateComplete;
  //     return blockquote.outerHTML;
  //   });

  //   const renderedHTML = await html(renderedBlockquoteHTML);

  //   // @todo: rendererdHTML is null
  //   // expect(
  //   //   renderedHTML
  //   //     .querySelector('.c-bolt-blockquote')
  //   //     .classList.contains('c-bolt-blockquote--xlarge'),
  //   // ).toBe(true);

  //   // @todo: this Promise never returns
  //   // await page.evaluate(async () => {
  //   //   const selectors = Array.from(
  //   //     document.querySelectorAll('bolt-blockquote'),
  //   //   );
  //   //   return await Promise.all(
  //   //     selectors.map(blockquote => {
  //   //       if (blockquote._wasInitiallyRendered === true) return;
  //   //       return new Promise((resolve, reject) => {
  //   //         blockquote.addEventListener('ready', resolve);
  //   //         blockquote.addEventListener('error', reject);
  //   //       });
  //   //     }),
  //   //   );
  //   // });

  //   expect(renderedHTML).toMatchSnapshot();
  // });

  // @todo: This step is pointless if we can't wait for the component to be ready.
  // test('<bolt-blockquote> renders when inside a <form>', async function() {
  //   const renderedBlockquoteHTML = await page.evaluate(() => {
  //     const form = document.createElement('form');
  //     const blockquote = document.createElement('bolt-blockquote');
  //     blockquote.setAttribute('author-name', 'Every Developer, Ever.');
  //     blockquote.setAttribute('border', 'horizontal');
  //     blockquote.setAttribute('size', 'xxlarge');
  //     blockquote.setAttribute('author-title', 'Web Developer');
  //     blockquote.innerHTML = `
  //       <img slot="logo" src="/fixtures/bolt-logo.svg" alt="Bolt Design System Logo" style="max-width: 200px">
  //       <p>Bolt Blockquote w/ Shadow DOM auto-disabled</p>
  //       <p>Yeah, but it works on my machine...</p>
  //     `;
  //     document.body.appendChild(form);
  //     document.body.classList.add('u-bolt-padding-medium');
  //     form.appendChild(blockquote);
  //     // @todo: updateComplete Promise not working inside Puppeteer
  //     // await blockquote.updateComplete;
  //     return blockquote.innerHTML;
  //   });

  //   // @todo: this Promise never returns
  //   // await page.evaluate(async () => {
  //   //   const selectors = Array.from(
  //   //     document.querySelectorAll('bolt-blockquote'),
  //   //   );
  //   //   return await Promise.all(
  //   //     selectors.map(blockquote => {
  //   //       if (blockquote._wasInitiallyRendered === true) return;
  //   //       return new Promise((resolve, reject) => {
  //   //         blockquote.addEventListener('ready', resolve);
  //   //         blockquote.addEventListener('error', reject);
  //   //       });
  //   //     }),
  //   //   );
  //   // });

  //   const renderedHTML = await html(renderedBlockquoteHTML);
  //   expect(renderedHTML).toMatchSnapshot();
  // });

  // @todo: This step is pointless if we can't wait for the component to be ready.
  // test('<bolt-blockquote> with No Quotes renders', async function() {
  //   const defaultBlockquoteOuter = await page.evaluate(() => {
  //     const blockquote = document.createElement('bolt-blockquote');
  //     blockquote.setAttribute(
  //       'author-name',
  //       'Michelangelo di Lodovico Buonarroti Simoni',
  //     );
  //     blockquote.setAttribute('author-title', 'Renaissance Artist');
  //     blockquote.setAttribute('no-quotes', '');
  //     blockquote.innerHTML = `
  //       <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
  //       <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
  //     document.body.appendChild(blockquote);
  //     // @todo: updateComplete Promise not working inside Puppeteer
  //     // await blockquote.updateComplete;
  //     return blockquote.outerHTML;
  //   });

  //   const renderedHTML = await html(defaultBlockquoteOuter);
  //   expect(renderedHTML).toMatchSnapshot();
  // });

  // @todo: This step is pointless if we can't wait for the component to be ready.
  // languages.forEach(async lang => {
  //   test(`<bolt-blockquote> with lang-specific quotes (${lang})`, async () => {
  //     await page.evaluate(lang => {
  //       const blockquote = document.createElement('bolt-blockquote');
  //       blockquote.setAttribute(
  //         'author-name',
  //         'Michelangelo di Lodovico Buonarroti Simoni',
  //       );
  //       blockquote.setAttribute('author-title', 'Renaissance Artist');
  //       blockquote.setAttribute('lang', lang);
  //       blockquote.innerHTML = `
  //         <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
  //         <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
  //       document.body.appendChild(blockquote);
  //       // @todo: updateComplete Promise not working inside Puppeteer
  //       // await blockquote.updateComplete;
  //     }, lang);

  //     const blockquoteShadowRoot = await page.evaluate(async () => {
  //       // @todo: renderRoot is undefined
  //       // return document
  //       //   .querySelector('bolt-blockquote')
  //       //   .renderRoot.querySelector('.c-bolt-blockquote').outerHTML;
  //       return document.querySelector('bolt-blockquote').outerHTML;
  //     });

  //     const renderedShadowRoot = await html(
  //       `<div>${blockquoteShadowRoot}</div>`,
  //     );
  //     expect(renderedShadowRoot.innerHTML).toMatchSnapshot();
  //   });
  // });

  // @TODO Re-enable VRT test and troubleshoot intermittent failures on Travis
  // follow-up VRT to catch the visual regression related to http://vjira2:8080/browse/BDS-2074
  // test('<bolt-blockquote> initially rendering via Twig display quotes correctly', async function() {
  //   // significantly increase the pixel density for a higher precision VRT diff
  //   await page.setViewport({
  //     width: 200,
  //     height: 80,
  //     deviceScaleFactor: 16,
  //   });

  //   // Only include bare-minimum content in Blockquote to reduce the cross-OS text rendering differences throwing off any VRT results
  //   const results = await render(
  //     '@bolt-components-blockquote/blockquote.twig',
  //     {
  //       content: '<p>OK</p>',
  //       border: 'vertical',
  //       inset: true,
  //       weight: 'bold',
  //     },
  //   );

  //   const renderedBlockquoteHTML = results.html;

  //   await page.evaluate(renderedBlockquoteHTML => {
  //     document.body.insertAdjacentHTML(
  //       'beforeend',
  //       `${renderedBlockquoteHTML}`,
  //     );
  //     document.body.classList.add('u-bolt-padding-small');
  //     document.body.classList.add('t-bolt-xdark');
  //   }, renderedBlockquoteHTML);

  //   await page.evaluate(async () => {
  //     const selectors = Array.from(
  //       document.querySelectorAll('bolt-blockquote'),
  //     );
  //     return await Promise.all(
  //       selectors.map(blockquote => {
  //         if (blockquote._wasInitiallyRendered === true) return;
  //         return new Promise((resolve, reject) => {
  //           blockquote.addEventListener('ready', resolve);
  //           blockquote.addEventListener('error', reject);
  //         });
  //       }),
  //     );
  //   });

  //   const blockquote = await page.$('bolt-blockquote');
  //   const boundingBox = await blockquote.boundingBox();

  //   await page.waitFor(1000);

  //   // crop the blockquote screenshot to the element's dimensions so the visual % difference between w/ and w/o quotes is more easily measurable
  //   const image = await page.screenshot({
  //     clip: {
  //       x: boundingBox.x,
  //       y: boundingBox.y,
  //       width: Math.min(boundingBox.width, page.viewport().width),
  //       height: Math.min(boundingBox.height, page.viewport().height),
  //     },
  //   });
  // });
});
