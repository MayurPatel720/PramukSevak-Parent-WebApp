import { User } from "lucide-react";
import { useEffect, useRef } from "react";

const WelcomeAnimation = ({ onComplete }: { onComplete: () => void }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const logoRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLDivElement | null>(null);
	const particlesRef = useRef<Array<HTMLDivElement | null>>([]);
	const circleRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof gsap === "undefined") return;

		const tl = gsap.timeline({
			onComplete: () => {
				setTimeout(onComplete, 200);
			},
		});

		// Initial setup
		gsap.set(containerRef.current, { opacity: 1 });

		// Animated particles
		const particles = particlesRef.current;
		particles.forEach((particle) => {
			gsap.set(particle, {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				scale: 0,
				opacity: 0,
			});
		});

		// Main animation sequence - shortened to 2 seconds
		tl.to(circleRef.current, {
			scale: 1,
			opacity: 0.3,
			duration: 0.4,
			ease: "power2.out",
		})
			.to(
				circleRef.current,
				{
					scale: 50,
					opacity: 0,
					duration: 0.6,
					ease: "power2.in",
				},
				"-=0.2"
			)
			.fromTo(
				logoRef.current,
				{ scale: 0, rotation: -180, opacity: 0 },
				{
					scale: 1,
					rotation: 0,
					opacity: 1,
					duration: 0.5,
					ease: "back.out(1.7)",
				},
				"-=0.4"
			)
			.to(logoRef.current, {
				y: -20,
				duration: 0.3,
				ease: "power2.out",
			})
			.fromTo(
				titleRef.current,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
				"-=0.2"
			);

		// Particles animation - faster
		particles.forEach((particle, i) => {
			tl.to(
				particle,
				{
					scale: 1,
					opacity: 0.8,
					duration: 0.2,
					ease: "power2.out",
				},
				`-=${1 - i * 0.05}`
			).to(
				particle,
				{
					y: `-=${Math.random() * 150 + 80}`,
					x: `+=${(Math.random() - 0.5) * 150}`,
					opacity: 0,
					duration: 0.8,
					ease: "power2.out",
				},
				"-=0.1"
			);
		});

		tl.to(
			containerRef.current,
			{
				opacity: 0,
				duration: 0.3,
				ease: "power2.inOut",
			},
			"+=0"
		);
	}, [onComplete]);

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
			style={{
				background:
					"linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
				opacity: 0,
			}}
		>
			{/* Animated circle background */}
			<div
				ref={circleRef}
				className="absolute rounded-full bg-white"
				style={{
					width: "100px",
					height: "100px",
					opacity: 0,
					transform: "scale(0)",
				}}
			/>

			{/* Particles */}
			{[...Array(12)].map((_, i) => (
				<div
					key={i}
					ref={(el) => {
						particlesRef.current[i] = el;
					}}
					className="absolute w-3 h-3 rounded-full"
					style={{
						background: `rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`,
						boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
					}}
				/>
			))}

			{/* Main content */}
			<div className="relative z-10 text-center">
				<div
					ref={logoRef}
					className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-white shadow-2xl flex items-center justify-center"
					style={{ opacity: 0, transform: "scale(0)" }}
				>
					<User className="w-16 h-16 text-blue-600" />
				</div>

				<div ref={titleRef} style={{ opacity: 0 }}>
					<h1
						className="text-5xl font-bold text-white mb-4"
						style={{
							textShadow:
								"0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3)",
						}}
					>
						Pramuk Sevak
					</h1>
				</div>
			</div>

			{/* Light rays effect */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="absolute bg-white opacity-10"
						style={{
							width: "2px",
							height: "100%",
							left: `${i * 12.5 + 6.25}%`,
							transform: `rotate(${i * 45}deg)`,
							transformOrigin: "center",
							animation: `pulse ${2 + Math.random()}s ease-in-out infinite`,
						}}
					/>
				))}
			</div>

			<style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
      `}</style>
		</div>
	);
};

export default WelcomeAnimation;
