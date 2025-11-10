# exitojuntos - Angular 20 Application

> ⚠️ **Importante**: Esta aplicación ha sido migrada completamente a la arquitectura **Standalone** de Angular 20.
> No utiliza módulos tradicionales (`NgModule`). Ver [MIGRATION-TO-STANDALONE.md](./MIGRATION-TO-STANDALONE.md) para más detalles.

## 🚀 Tecnologías

- **Angular**: v20.3.9 (Standalone Architecture)
- **TypeScript**: 5.x
- **Firebase**: v9.22.0
- **Bootstrap**: v5.2.3
- **RxJS**: v7.8.2

## 📋 Requisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Angular CLI 20.x

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Limpiar cache (si es necesario)
npm run ng cache clean
```

## 💻 Desarrollo

```bash
# Servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en http://localhost:4200/
```

## 🏗️ Build

```bash
# Build de producción
npm run build:prod

# Build estándar
ng build

# Los archivos compilados se guardarán en la carpeta dist/
```

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con cobertura
ng test --code-coverage
```

## 📁 Estructura del Proyecto (Standalone)

```
src/
├── main.ts                    # Punto de entrada (bootstrapApplication)
└── app/
    ├── app.component.ts       # Componente raíz (standalone)
    ├── app.config.ts          # Configuración de la aplicación
    ├── app.routes.ts          # Definición de rutas
    ├── admin/                 # Módulo de administración
    │   └── admin.routes.ts    # Rutas lazy loaded
    ├── client/                # Módulo de clientes
    │   └── client.routes.ts   # Rutas lazy loaded
    ├── authentication/        # Módulo de autenticación
    │   └── authentication.routes.ts
    ├── layout/                # Componentes de layout (standalone)
    ├── core/                  # Servicios y guards
    └── shared/                # Componentes y utilidades compartidas
```

## 🔧 Scripts Disponibles

```bash
npm start              # Inicia servidor de desarrollo
npm run build:prod     # Build de producción con optimizaciones
npm test               # Ejecuta tests unitarios
npm run lint           # Ejecuta linter
npm run e2e            # Ejecuta tests e2e
```

## 🎯 Arquitectura Standalone

Esta aplicación usa la nueva arquitectura standalone de Angular 20:

- ✅ **Sin NgModules**: Todos los componentes son standalone
- ✅ **Lazy Loading Mejorado**: Carga componentes individuales
- ✅ **Tree-Shaking Optimizado**: Mejor eliminación de código no utilizado
- ✅ **DX Mejorado**: Menos boilerplate, más productividad

### Características Principales:

1. **Bootstrap de Aplicación**: Se usa `bootstrapApplication()` en lugar de `platformBrowserDynamic()`
2. **Configuración Centralizada**: Todo en `app.config.ts`
3. **Rutas Standalone**: Definidas en `app.routes.ts`
4. **Componentes Independientes**: Todos importan sus propias dependencias
5. **Servicios con `providedIn: 'root'`**: Registro automático

## 📚 Documentación Adicional

- [Guía de Migración](./MIGRATION-TO-STANDALONE.md) - Detalles de la migración a standalone
- [Checklist de Validación](./VALIDATION-CHECKLIST.md) - Lista de verificación post-migración

## 🔗 Enlaces Útiles

- [Documentación de Angular](https://angular.dev)
- [Standalone Components Guide](https://angular.dev/guide/components/importing)
- [Angular CLI](https://angular.dev/tools/cli)

## 📝 Notas Importantes

### Crear Nuevos Componentes

```bash
# Los nuevos componentes se crean standalone por defecto
ng generate component my-component

# Si necesitas especificarlo explícitamente
ng generate component my-component --standalone
```

### Migración de Componentes Existentes

Si encuentras componentes que aún no son standalone:

```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  standalone: true,  // Agregar esta línea
  imports: [         // Agregar imports necesarios
    CommonModule,
    FormsModule,
    // ... otros módulos
  ]
})
export class MyComponent { }
```

## 🤝 Contribución

Al contribuir código, asegúrate de:

1. Todos los componentes nuevos deben ser standalone
2. Seguir la estructura de archivos existente
3. Incluir tests unitarios
4. Seguir las guías de estilo de Angular

## 📄 Licencia

Copyright © 2025 exitojuntos. Todos los derechos reservados.

---

**Versión Angular**: 20.3.9  
**Última Migración**: 2025-01-04 (Standalone Architecture)
