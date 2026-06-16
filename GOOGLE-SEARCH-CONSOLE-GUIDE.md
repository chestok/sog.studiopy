# 🔧 Guía: Configuración en Google Search Console

**Para:** SOG.STUDIOPY - Diseño Web en Paraguay  
**Dominio:** https://sog.studiopy.com  
**Fecha:** 16 de junio de 2026

---

## 📋 Tabla de Contenidos

1. [Paso 1: Crear Propiedad en GSC](#paso-1-crear-propiedad-en-gsc)
2. [Paso 2: Verificar Propiedad](#paso-2-verificar-propiedad)
3. [Paso 3: Enviar Sitemap](#paso-3-enviar-sitemap)
4. [Paso 4: Solicitar Indexación](#paso-4-solicitar-indexación)
5. [Paso 5: Monitoreo y Optimización](#paso-5-monitoreo-y-optimización)

---

## Paso 1: Crear Propiedad en GSC

### 1.1 Acceder a Google Search Console
1. Ve a: https://search.google.com/search-console
2. Inicia sesión con tu cuenta Google
3. Haz clic en "Agregar propiedad"

### 1.2 Seleccionar tipo de propiedad
- Selecciona: **Dominio** (si tienes control total del dominio)
  - URL: `sog.studiopy.com`
- O selecciona: **Prefijo de URL** (alternativa)
  - URL: `https://sog.studiopy.com`

### 1.3 Elegir método de verificación
Para dominio completo (recomendado):
- Google proporcionará un registro TXT de DNS
- Copia el registro TXT
- Agrégalo en la configuración DNS de tu proveedor

Para prefijo de URL (alternativas):
1. **Archivo HTML** (más fácil)
   - Descarga `google-site-verification-[código].html`
   - Cópialo en la carpeta `/public/`

2. **Meta etiqueta HTML**
   - Ya está agregada en el `<head>` de index.html:
   ```html
   <meta name="google-site-verification" content="F1Jn1tM62eRMXht4-HM_WpWohNjXoAUgFD2lXSIKz8o" />
   ```

3. **Google Analytics** (si tienes implementado)

4. **Google Tag Manager** (si tienes implementado)

---

## Paso 2: Verificar Propiedad

### 2.1 Verificación mediante DNS (Recomendado)
```
Tipo de registro: TXT
Nombre/Host: sog.studiopy.com (o @)
Valor: google-site-verification=F1Jn1tM62eRMXht4-HM_WpWohNjXoAUgFD2lXSIKz8o
```

### 2.2 Verificación mediante Meta Etiqueta
✓ La meta etiqueta ya está en el HTML:
```html
<meta name="google-site-verification" content="F1Jn1tM62eRMXht4-HM_WpWohNjXoAUgFD2lXSIKz8o" />
```

### 2.3 Completar verificación
1. En GSC, haz clic en "Verificar"
2. Si usas DNS, puede tardar 24-48 horas
3. Si usas meta etiqueta, debería ser instantáneo (después del deploy)

---

## Paso 3: Enviar Sitemap

### 3.1 Ubicación del Sitemap
```
URL: https://sog.studiopy.com/sitemap.xml
```

### 3.2 Enviar en GSC
1. Ve a **Sitemaps** en el menú lateral
2. Haz clic en "Agregar/Probar sitemap"
3. Ingresa la URL del sitemap: `sitemap.xml`
4. Haz clic en "Enviar"

### 3.3 Validar Sitemap
- Estado esperado: **Exitoso**
- Debería detectar 6 URLs:
  - Página principal
  - #inicio
  - #servicios
  - #sobre-sebas
  - #showcase
  - #contacto

---

## Paso 4: Solicitar Indexación

### 4.1 Solicitar indexación de URL principal
1. En GSC, haz clic en "Inspección de URL"
2. Ingresa: `https://sog.studiopy.com`
3. Haz clic en "Solicitar indexación"
4. Espera a que se complete la solicitud

### 4.2 Verificar estados de indexación
En el menú lateral:
- Ve a **Cobertura**
- Deberías ver:
  - ✅ 6 URLs válidas con etiquetas de reglas
  - Puede haber URLs excluidas (fragments con #)

### 4.3 Crear nuevo Sitemap después del deploy
1. Haz clic en "Nuevo sitemap"
2. URL: `sitemap.xml`
3. Haz clic en "Enviar"

---

## Paso 5: Monitoreo y Optimización

### 5.1 Panel de Control Principal

**Resultados de búsqueda**
- CTR (Click Through Rate)
- Impresiones
- Posición media
- Palabras clave top

### 5.2 Datos de Rendimiento

**Monitorear cada 2 semanas:**
1. **Palabras clave objetivo**
   - Diseño web en Paraguay
   - Desarrollo web en Paraguay
   - Landing pages Paraguay
   - Diseñador web Asunción

2. **Posición esperada**
   - Mes 1-2: Posición 50-100+
   - Mes 2-4: Posición 20-50
   - Mes 4+: Posición 1-20 (para keywords long-tail)

3. **CTR esperado**
   - Inicial: 0.5-2%
   - Meta: 5-15% (depende del keyword)

### 5.3 Problemas Comunes

**Si no aparecen datos:**
- Esperar 2-4 semanas
- Validar que robots.txt NO bloquea indexación
- Revisar en Cobertura si hay errores

**Si hay errores de cobertura:**
1. Ve a **Cobertura**
2. Haz clic en "Erróneo" si aparece
3. Revisa los errores específicos
4. Resuelve según el tipo:
   - **Error de rastreo:** Verificar conectividad
   - **Error de indexación:** Revisar robots.txt
   - **Exclusión del robots.txt:** Actualizar robots.txt

### 5.4 Configuración Recomendada

**Configuración de URL**
1. Ve a **Configuración**
2. Selecciona versión preferida:
   - https:// (recomendado)
   - Indicar www o no-www

**Mapa del sitio**
1. Ve a **Sitemaps**
2. Confirmar sitemap.xml está enviado

**Etiqueta canonical**
- ✓ Está implementada: `https://sog.studiopy.com`

**Hreflang**
- No necesario (solo español en Paraguay)

---

## 📊 Herramientas Recomendadas Adicionales

### Integración con Analytics
1. Ve a **Configuración**
2. Enlaza con Google Analytics
3. Permite correlacionar datos

### Herramientas Externas (Gratuitas)
1. **Lighthouse** (en Chrome DevTools)
   - Presiona F12 → Tab "Lighthouse"
   - Genera reporte SEO, Performance, etc.

2. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev
   - Analiza velocidad de carga

3. **Schema.org Validator**
   - URL: https://validator.schema.org
   - Valida JSON-LD implementado

4. **SERP Simulator**
   - Simula cómo aparecerá en resultados

---

## 📅 Cronograma de Verificación

### Semana 1-2
- ✓ Crear propiedad en GSC
- ✓ Verificar dominio
- ✓ Enviar sitemap
- ✓ Solicitar indexación

### Semana 3-4
- Revisar cobertura
- Verificar indexación de páginas
- Revisar errores de rastreo

### Mes 1-2
- Monitorear palabras clave
- Revisar CTR e impresiones
- Analizar posición media

### Mes 2-4
- Optimizaciones adicionales
- Crear contenido complementario
- Monitorear backlinks

---

## 🔗 Enlaces Útiles

- **Google Search Console:** https://search.google.com/search-console
- **Lighthouse:** Integrado en Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev
- **Schema Validator:** https://validator.schema.org
- **Google Analytics:** https://analytics.google.com

---

## ⚠️ Notas Importantes

1. **Verificación DNS puede tardar 24-48 horas**
   - Paciencia en el proceso

2. **Indexación no es instantánea**
   - Google puede tardar días a semanas
   - Es normal al principio

3. **Las mejoras toman tiempo**
   - SEO orgánico es proceso a largo plazo
   - Esperar 2-4 meses para resultados significativos

4. **Monitoreo consistente**
   - Revisar GSC regularmente
   - Hacer ajustes según datos

5. **Calidad del contenido**
   - SEO técnico es base, pero contenido es rey
   - Considerar agregar blog con artículos relevantes

---

**¿Preguntas?**  
Consulta la documentación oficial: https://support.google.com/webmasters

**Última actualización:** 16/06/2026  
**Versión:** 1.0
