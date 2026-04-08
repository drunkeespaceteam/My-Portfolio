import { build } from 'vite';
build().catch(e => {
  console.log("=== VITE ERROR MESSAGE ===");
  console.log(e.message);
  console.log("=== VITE ERROR ID ===");
  console.log(e.id);
  console.log("=== VITE ERROR FRAME ===");
  console.log(e.frame);
});
