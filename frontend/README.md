# frontend

## UI Stack



### Ant Design

**Ant Design** is a leading UI framework that offers a comprehensive suite of high-quality components and design elements.

- **Professional Aesthetics**: It provides a polished and consistent look and feel, ensuring your application has a modern and professional user interface.
- **Rich Component Library**: With a vast array of pre-built components, we can implement features more efficiently, reducing development time.
- **Customization**: While it offers ready-to-use components, it's highly customizable, allowing us to tailor the UI to your specific branding and requirements.
- **Responsive Design**: Ant Design ensures that your application will be accessible and visually appealing across all devices and screen sizes.

### UmiJS

**UmiJS** is a powerful front-end framework that enhances our development process.

- **Convention over Configuration**: UmiJS simplifies development with its built-in routing and project structure conventions, leading to faster development cycles.
- **Plugin Ecosystem**: It supports a wide range of plugins, enabling us to add features like internationalization, analytics, and more with ease.
- **Performance Optimization**: UmiJS includes out-of-the-box optimizations for code splitting and loading, which enhances the application's performance.
- **Seamless Integration**: It works seamlessly with Ant Design, ensuring that all components and pages integrate smoothly.

### ahooks Library

The **ahooks** library is a collection of React Hooks that boosts productivity and code quality.

- **Enhanced Functionality**: It offers a set of well-designed hooks that handle common tasks, such as form management, state management, and side effects.
- **Code Reusability**: By using ahooks, we can write cleaner and more maintainable code, which makes future updates and scaling more manageable.
- **Performance**: ahooks are optimized for performance, which contributes to a smoother user experience within your application.

### **Benefits for Your Project**

- **Faster Time-to-Market**: Leveraging these technologies accelerates the development process, allowing us to deliver your application more quickly.
- **Cost Efficiency**: Reduced development time translates to cost savings without compromising on quality.
- **Scalability**: The robust nature of these tools ensures that your application can grow and adapt to future needs.
- **User Satisfaction**: A consistent, responsive, and intuitive user interface enhances user engagement and satisfaction.
- **Maintainability**: Clean and well-structured codebase makes it easier to maintain and update the application over time.
- **Enhanced User Experience**: Faster load times and a responsive interface keep users engaged and satisfied.

-  **Global Scalability**: CDN hosting ensures that your application performs well for users around the world.

-  **Reduced Operational Costs**: Simplified infrastructure and deployment lead to lower hosting and maintenance expenses.

-  **Future-Proof Architecture**: The technologies chosen are modern and widely supported, ensuring longevity and ease of updates.



## Why UmiJS Over Next.js

While both **UmiJS** and **Next.js** are excellent frameworks for building React applications, UmiJS was chosen for several reasons that align with your project's goals.

#### **Bundling and Deployment Flexibility**

- **Static Asset Generation**: UmiJS enables us to bundle the entire application into static files. This means we can deploy your application as a collection of static assets without needing a Node.js server.
- **CDN and Web Server Hosting**: These static files can be served directly from Content Delivery Networks (CDNs) or traditional web servers like **Nginx** or **OpenResty**. This setup improves load times and scalability, as content is delivered from servers closest to the user.
- **Simplified Infrastructure**: By eliminating the need for server-side rendering at runtime, we reduce complexity and potential points of failure, resulting in a more robust application.

#### **Customizability and Enterprise Features**

- **Highly Configurable**: UmiJS offers extensive customization options, allowing us to fine-tune the application to your specific needs without being constrained by convention.
- **Plugin Ecosystem**: With a rich plugin system, UmiJS lets us add or modify functionalities seamlessly, enhancing the development process and future-proofing your application.
- **Enterprise-Level Support**: UmiJS is designed with enterprise applications in mind, providing features like internationalization, access control, and advanced routing out of the box.

#### **Performance Optimization**

- **Optimized Bundling**: UmiJS excels at code splitting and lazy loading, which means users only download what's necessary, improving load times.
- **Better SEO and Caching**: Serving static files allows for improved search engine optimization and easier caching strategies, enhancing visibility and performance.

#### **Comparison with Next.js**

- **Deployment Flexibility**: While Next.js is excellent for server-side rendering and hybrid applications, it often requires a Node.js server to operate effectively. UmiJS's ability to generate fully static assets gives us more flexibility in deployment options.
- **Simplified Maintenance**: Serving static files reduces server maintenance efforts and costs, as there are fewer components to manage and update.
- **Cost Efficiency**: Hosting static files on CDNs or simple web servers is generally more cost-effective than maintaining server instances for server-side rendering.



## Running the frontend

To install dependencies:

```bash
yarn install
```

To run:

```bash
yarn run dev
```

Alternatively, you can use [Bun](https://bun.sh/) as a package manager for blazing fast dependency installation:

```shell
bun install
```

To run:

```shell
bunx umi dev
```



By default, [Mako](https://makojs.dev/) was chosen as a bundler. Mako is a new web bundler for Web App, Library, and Framework. It's designed to be fast, reliable, and easy to use. It has been used in hundreds of projects in production by Ant Group, and other companies.

To switch back to MFSU bundler, all you need is just to remove `mako: {}` from the `.umirc.ts` file and add `mfsu: {}` instead.

More details on Mako features can be found here: https://makojs.dev/docs/features