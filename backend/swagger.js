import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * Swagger setup function to initialize Swagger documentation
 * @returns {Object} swagger options and documentation
 */
const setupSwagger = (app) => {
  // Swagger definition
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',  // OpenAPI version
      info: {
        title: 'Voting System APIs',  // API title
        version: '1.0.0',  // Version of the API
        description: 'API documentation for the Voting System',  // Description of the API
      },
      servers: [
        {
          url: 'http://localhost:3000/api',  // Base URL for your API
        },
      ],
    },
    apis: ['./routes/*.js'],  // Path to your route files for documentation
  };

  // Initialize Swagger documentation
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  // Serve Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
