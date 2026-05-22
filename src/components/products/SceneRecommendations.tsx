import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SceneRecommendation } from '@/types';
import { sceneRecommendations } from '@/data/products';
import { GlassCard } from '../ui/GlassCard';

interface SceneRecommendationsProps {
  onSelectScene: (scene: SceneRecommendation) => void;
}

export function SceneRecommendations({ onSelectScene }: SceneRecommendationsProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-[#F0F0F5]">场景推荐</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {sceneRecommendations.map((scene, i) => (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard hover onClick={() => onSelectScene(scene)} className="group">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(108,92,231,0.2)] to-[rgba(0,210,255,0.1)] text-2xl">
                  {scene.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#F0F0F5] group-hover:text-[#6C5CE7] transition-colors">
                    {scene.titleZh}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#8E8EA0] truncate">{scene.description}</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-[#5A5A72] group-hover:text-[#6C5CE7] group-hover:translate-x-1 transition-all" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
