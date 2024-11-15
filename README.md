## 🧪 Tests

Para ejecutar los tests:

```bash
cd backend
npm test
```

Para ejecutar los tests en modo watch:

```bash
npm run test:watch
```

## 🔄 CI/CD

El proyecto utiliza GitHub Actions para:
- Ejecutar tests automáticamente
- Verificar el build de Docker
- Validar la configuración de Docker Compose

Los workflows se ejecutan en:
- Cada push a main
- Cada Pull Request a main